import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const NavBar = () => {
  return (
    <nav className='flex justify-between items-center fixed z-50  w-full bg-dark-1 px-6 py-4 lg:px-10 '>
      <Link href={"/"} className='flex items-center gap-1 justify-center '>
        <Image src="/icons/logo.svg" alt='Yoom Logo' width={40} height={40} className='max-sm:size-10' />
        <p className='text-white text-[26px] font-extrabold max-sm:hidden'>YOOM</p>
      </Link>
      <div className="flex justify-between gap-5">
        {/* "clerk User managment" */}
        <SignedIn >
          <UserButton signInUrl='/'/>
        </SignedIn  >
        <MobileNav/>
      </div>
    </nav>
  )
}

export default NavBar