"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorsCard from "./SuggestedDoctorsCard";
import { Map } from "lucide-react";
import { SessionChatTable } from "@/config/schema";
import { useRouter } from "next/navigation";
function AddNewSessionDialog() {
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggesteddoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor,setSelectedDoctor]= useState<doctorAgent>();
  const router =useRouter();
  const OnClickNext = async () => {
    setLoading(true);
    const result = await axios.post("/api/suggest-doctors", {
      notes: note,
    });

    console.log(result.data);
setSuggesteddoctors(
  Array.isArray(result.data) ? result.data : 
  result.data?.suggested_doctors || result.data?.doctors || []
);
    setLoading(false);
  };
  const onStartConsultation =async() =>  {
    setLoading(true);
     // Save all info to the database 
     const result =await axios.post('/api/session-chat',{
      notes:note ,
      selectedDoctor:selectedDoctor
     });
    console.log(result.data.sessionId);
     if(result.data?.sessionId){
      console.log(result.data.sessionId);
      //Route new Conversation Screen
      router.push('/dashboard/medical-Agent/'+result.data.sessionId);

     }
     setLoading(false);
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">+ Start a Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {suggestedDoctors.length == 0? 
              <div>
                <h2>Add symptoms or any other details</h2>
                <Textarea
                  placeholder="Add details here...."
                  className="h-[200px] mt-1"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div> : 
            <div>
              <h2>Select the Doctor</h2> 
              <div className="grid grid-cols-2 gap-3">
                {/* Suggested Doctors */}
                {suggestedDoctors.map((doctor, index) => (
                  <SuggestedDoctorsCard doctorAgent={doctor} key={index}
                  setSelectedDoctor={()=>setSelectedDoctor(doctor)}
                  //@ts-ignore
                 selectedDoctor={selectedDoctor} />  
                  
                ))}
              </div>
              </div>
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          {suggestedDoctors.length == 0 ? 
            <Button disabled={!note || loading} onClick={() => OnClickNext()}>
              Next {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
           : 
            <Button disabled={loading ||!selectedDoctor} onClick={()=>onStartConsultation()}>
              Start Consultation 
              {loading ? <Loader2 className='animate-spin'/> : <ArrowRight />}  
            </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
