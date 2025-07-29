"use client"
import React from 'react'
import Image from 'next/image'
import DoctorsAgentList from './DoctorsAgentList'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'
import { IconArrowRampRight, IconArrowRampRight3, IconArrowRight } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'
export type doctorAgent={

            id:number,
            specialist: string ,
            description:string
            image: string
            agentPrompt :string
            voiceId?:string
}

type props={
    doctorAgent:doctorAgent 
}
function DoctorAgentCard({ doctorAgent }: props) {
    const [loading, setLoading] = useState(false);
  
      const router =useRouter();
   const onStartConsultation =async() =>  {
    setLoading(true);
     // Save all info to the database 
     const result =await axios.post('/api/session-chat',{
      notes:'New Query' ,
      selectedDoctor:doctorAgent
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
    <div className=''>
        <Image src={doctorAgent.image}
               alt={doctorAgent.specialist}
               width={150} 
               height={200} 
               className='w-full h-[250px] object-cover rounded-xl'/> 

          <h2 className='font-bold '> {doctorAgent.specialist}</h2>
          <p className='line-clamp-2 mt-1 text-sm text-gray-500'> {doctorAgent.description}</p>
          <Button className='w-full mt-2 '
          onClick={onStartConsultation}> 
            Start Consultation {loading ? <Loader2Icon className='animate-spin'/> : <IconArrowRight/>} </Button>
    </div>
  )
}

export default DoctorAgentCard