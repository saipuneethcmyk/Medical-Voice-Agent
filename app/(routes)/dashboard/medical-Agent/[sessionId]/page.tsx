"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, PhoneCall, PhoneOff, Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

 export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type message = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const [loading, setLoading] = useState(false);
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>(null);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [LiveTranscript, setLiveTranscript] = useState<string>("");
  const [messages, setMessages] = useState<message[]>([]);
  const router=useRouter();

  useEffect(() => {
    if (sessionId) {
      axios
        .get("/api/session-chat?sessionId=" + sessionId)
        .then((res) => {
          // Handle the case where the API returns an array
          const data = Array.isArray(res.data) ? res.data[0] : res.data;
          setSessionDetail(data);
        });
    }
  }, [sessionId]);

  const StartCall = () => {
    // Clean up previous instance if any
    if (vapiInstance) {
      vapiInstance.stop();
      setVapiInstance(null);
    }

    const voiceId = sessionDetail?.selectedDoctor?.voiceId;
    if (!voiceId) {
      alert("No voiceId found for this doctor.");
      return;
    }
    console.log("Using voiceId:", voiceId);

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const VapiAgentConfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hii! I am your AI Medical Assistant .I am here to help you with .Health questions opr concerns you might Have today ,How are you feeling ",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "playht",
        voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: sessionDetail?.selectedDoctor?.agentPrompt,
          },
        ],
      },
    };

    console.log("VapiAgentConfig:", VapiAgentConfig);

    try {
      vapi.start(VapiAgentConfig);
    } catch (err) {
      console.error("Vapi start error:", err);
      alert("Failed to start voice call. See console for details.");
    }

    vapi.on("call-start", () => {
      setCallStarted(true);
    });
  };

  const GenerateReport = async () => {
    const result = await axios.post("/api/medical-report", {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId,
    });
    return result.data;
  };

  const endCall = async () => {
    if (!vapiInstance) return;
    setLoading(true);
    vapiInstance.stop();
    setCallStarted(false);
    setVapiInstance(null);
    await GenerateReport();
    console.log('Call Ended');
    setLoading(false);
    toast.success('Your Report is generated!');
    router.replace('/dashboard');

  };

  useEffect(() => {
    if (!vapiInstance) return;

    const handleCallEnd = async () => {
      setCallStarted(false);
    };

    const handleMessage = (message: any) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;

        if (transcriptType === "partial") {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType === "final") {
          setMessages((prev) => [...prev, { role, text: transcript }]);
          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    };

    const handleSpeechStart = () => {
      setCurrentRole("assistant");
    };

    const handleSpeechEnd = () => {
      setCurrentRole("user");
    };

    vapiInstance.on("call-end", handleCallEnd);
    vapiInstance.on("message", handleMessage);
    vapiInstance.on("speech-start", handleSpeechStart);
    vapiInstance.on("speech-end", handleSpeechEnd);

    return () => {
      vapiInstance.off("call-end", handleCallEnd);
      vapiInstance.off("message", handleMessage);
      vapiInstance.off("speech-start", handleSpeechStart);
      vapiInstance.off("speech-end", handleSpeechEnd);
    };
  }, [vapiInstance]);

  return (
    <div className="p-5 border rounded-3xl bg-secondary text-black">
        <div className="flex justify-between items-center">
          <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
            <Circle
              className={`h-4 w-4 rounded-full ${
                callStarted ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {callStarted ? "Connected..." : "Not Connected"}
          </h2>
          <h2 className="font-bold text-gray-400">00:00</h2>
        </div>

  {sessionDetail && sessionDetail.selectedDoctor && (  
           <div className="flex items-center flex-col mt-10">
          <Image
            src={sessionDetail.selectedDoctor.image} 
            alt={sessionDetail.selectedDoctor.specialist ?? ""}
            width={120}
            height={120}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetail.selectedDoctor.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-12 overflow-y-auto max-h-64 w-full space-y-1 px-4">
            {messages?.slice(-4).map((msg, index) => (
              <h2 className="text-gray-400 p-2 " key={index}>
                {msg.role} : {msg.text}
              </h2>
            ))}
            {LiveTranscript && LiveTranscript.length > 0 && (
              <h2 className="text-lg">
                {currentRole} : {LiveTranscript}
              </h2>
            )}
          </div>

          {!callStarted ? (
            <Button className="mt-20" onClick={StartCall} disabled={callStarted}>
              <PhoneCall className="mr-2" /> Start Call
            </Button>
          ) : (
            <Button variant="destructive" onClick={endCall}>
              {loading ? (
                <Loader className="animate-spin mr-2" />
              ) : (
                <PhoneOff className="mr-2" />
              )}
              Disconnect
            </Button>
          )}
        </div>
      )}
      </div>
  );
}

export default MedicalVoiceAgent;
