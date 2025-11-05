"use client";

import React from 'react'
import {
	Sheet,
	SheetClose,
	SheetContent,

	SheetTitle,

	SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';
const MobileNav = () => {
	const pathname = usePathname();
	return (
	  <section className="w-full max-w-[264px] sm:block lg:hidden md:hidden ">
      <Sheet>
        <SheetTrigger asChild>
       <MenuIcon size={35} className='text-white cursor-pointer'/>
        </SheetTrigger>
		<SheetTitle hidden>
		</SheetTitle>
        <SheetContent side="left" className="border-none bg-dark-1 p-6">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="Yoom logo"
            />
            <p className="text-[26px] font-extrabold text-white">YOOM</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild >
              <section className=" flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route ;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',
                          {
                            'bg-blue-1': isActive,
                          }
                        )}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
	)
}

export default MobileNav