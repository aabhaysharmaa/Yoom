import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { LayoutList, User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

const CallLayout = ({ layout }: { layout: string }) => {
  switch (layout) {
    case 'grid':
      return <PaginatedGridLayout />;
    case 'speaker-right':
      return <SpeakerLayout participantsBarPosition="left" />;
    case 'speaker-left':
    default:
      return <SpeakerLayout participantsBarPosition="right" />
  }
}
const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personals")
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState()
  if (callingState !== CallingState.JOINED) return <Loader />
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout layout={layout} />
        </div>
        <div
          className={cn(
            "h-[calc(100vh-86px)] ml-2 transition-all duration-300",
            showParticipants ? "block" : "hidden"
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        <CallControls />
        <DropdownMenu >
          <div className="flex items-center" >
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl p-3 bg-[#19232d] hover:bg-[#4c535b]'>
              <LayoutList size={20} className='text-white' />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1   bg-dark-1 text-white'>
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index} className='cursor-pointer' onClick={() => setLayout(item.toLowerCase() as CallLayoutType)} >
                <DropdownMenuItem>
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className='cursor-pointer rounded-2xl p-3 bg-[#19232d] hover:bg-[#4c535b]'>
            <User className='text-white ' size={20} />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section >
  );
};

export default MeetingRoom;
