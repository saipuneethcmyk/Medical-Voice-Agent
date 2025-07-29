import React from 'react'
import { doctorAgent } from './DoctorAgentCard'
import Image from 'next/image'

type Props = {
  doctorAgent: doctorAgent,
  setSelectedDoctor: (doctor: doctorAgent) => void,
  selectedDoctor: doctorAgent
}

function SuggestedDoctorsCard({ doctorAgent, setSelectedDoctor, selectedDoctor }: Props) {
  return (
    <div
      className={`flex flex-col items-center border rounded-2xl shadow p-5
        hover:border-blue-500 cursor-pointer 
        ${selectedDoctor?.id === doctorAgent?.id ? 'border-blue-500' : ''}`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      <Image
        src={doctorAgent?.image || "/fallback.jpg"} // fallback image
        alt={doctorAgent?.specialist || "Doctor"}
        width={70}
        height={70}
        className='w-[50px] h-[50px] rounded-full object-cover'
      />
      <h2 className='font-bold text-sm text-center mt-2'>{doctorAgent?.specialist}</h2>
      <p className='text-xs text-center line-clamp-2'>{doctorAgent?.description}</p>
    </div>
  );
}

export default SuggestedDoctorsCard;
