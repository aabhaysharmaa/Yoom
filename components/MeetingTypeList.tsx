"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
const MeetingTypeList = () => {
	const createMeeting = () =>{
       
	}
	const router = useRouter();
	const [meetingState, setMeetingState] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>();
	return (
		<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
			<HomeCard imgURL="/icons/add-meeting.svg" color="bg-orange-1" title="New Meeting" text="Setup a new recordings" handelClick={() => setMeetingState("isInstantMeeting")} />
			<HomeCard imgURL="/icons/join-meeting.svg" color="bg-purple-1" title="Join Meeting" text="via invitation link" handelClick={() => setMeetingState("isScheduleMeeting")} />
			<HomeCard imgURL="/icons/schedule.svg" color="bg-purple-2" title="Schedule Meeting" text="Plan your meeting" handelClick={() => setMeetingState("isJoiningMeeting")} />
			<HomeCard imgURL="/icons/recordings.svg" color="bg-yellow-1" title="View Recordings" text="Meeting recordings" handelClick={() => router.push("/recordings")} />
			<MeetingModal
				isOpen={meetingState === "isInstantMeeting"}
				onClose={() => setMeetingState(undefined)}
				title="Start an Instant Meeting"
				buttonText='Start Meeting'
				image=""
				buttonIcon=""
				handleClick={createMeeting}

			/>
		</section>
	)
}

export default MeetingTypeList