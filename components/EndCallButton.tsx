"use client";

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
const EndCallButton = () => {
	const call = useCall();
	const router = useRouter();
	const { useLocalParticipant } = useCallStateHooks();
	const localParticipant = useLocalParticipant();

	const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;
	if (!isMeetingOwner) return null ;
	return (
		<Button className='bg-red-500 cursor-pointer' onClick={async () => {
			await call.endCall();
			router.push("/")
			toast.success("Call Ended")
		}}>End call for everyone</Button>
	)
}

export default EndCallButton



