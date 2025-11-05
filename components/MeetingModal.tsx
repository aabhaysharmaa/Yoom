import React from 'react';


import {
	Dialog,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog"

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface MeetingModalProps {
	isOpen: boolean,
	onClose: () => void,
	title: string,
	buttonIcon?: string,
	buttonText: string
	children: React.ReactNode,
	handleClick: () => void;
	image?: string
	className: string
}

const MeetingModal = ({ isOpen, title, buttonIcon, image, buttonText, onClose, children, handleClick, className }: MeetingModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose} >
			<DialogTitle></DialogTitle>
			<DialogContent className='flex w-full max-w-[550px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
				<div className="flex flex-col gap-6">
					{image &&
						<div className='flex justify-center'>
							<Image src={image} alt='image' width={72} height={72} />
						</div>
					}
					<h1 className={cn("font-extrabold text-3xl leading-[42px]", className)}>{title}</h1>
					{children}
					<Button className='bg-blue-1 focus:visible:ring-0 focus-visible:ring-offset-0 ' onClick={handleClick}>
						{buttonIcon && (
							<Image src={buttonIcon} alt='buttonIcon' width={15} height={15} />
						)} &nbsp;
						{buttonText || "Schedule Meeting"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default MeetingModal