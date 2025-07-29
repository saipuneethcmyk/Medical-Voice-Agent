import React from 'react'
import Image from 'next/image'
import { index } from 'drizzle-orm/gel-core'
import { UserButton } from '@clerk/nextjs'
import { ClassNameValue } from 'tailwind-merge'
import Link from 'next/link'


const menuOptions= [
{
   
            id:1,
            name: 'Home',
            path: '/dashboard'

},
{
   
            id:2,
            name: 'History',
            path: '/dashboard/history'

},

{
   
            id:3,
            name: 'Profile',
            path: '/profile04' 

}]

function AppHeader() {
  return ( 
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40 '>    
        <Image src={'/logo.svg.png'}  alt='logo' width ={180}  height={90} />
        <div className=' hidden md:flex gap-12  items-center '> 
            {menuOptions.map((option,index) =>(
              <Link key={index} href={option.path}> 
                <h2 className='hover:font-bold cursor-pointer'>{option.name}</h2> 
              </Link>

            ))}
        </div>
          <UserButton/>
         </div>
  )



}

export default AppHeader 