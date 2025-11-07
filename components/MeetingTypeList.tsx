"use client";
import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";

const MeetingTypeList = () => {
	const { user } = useUser();
	const router = useRouter();
	const client = useStreamVideoClient();
	const [isLoading, setIsLoading] = useState<boolean>(false)


	const [values, setValues] = useState({
		dateTime: new Date(),
		description: "",
		link: "",
	});

	const [callDetails, setCallDetails] = useState<Call>();
	const [meetingState, setMeetingState] = useState<
		"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
	>();

	const createMeeting = async () => {
		setIsLoading(true);
		if (!user || !client) return;
		if (!values.dateTime) toast.error("Please  Select a date and time")
		try {
			const id = crypto.randomUUID();
			const call = client.call("default", id);
			if (!call) throw new Error("Failed to create Call");

			const startedAt =
				values.dateTime?.toISOString() || new Date(Date.now()).toISOString();
			const description = values.description || "Instant Meeting";

			await call.getOrCreate({
				data: {
					starts_at: startedAt,
					custom: { description },
				},
			});

			setCallDetails(call);

			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}
			toast.success("Meeting Created Successfully")
			setIsLoading(false)
		} catch (error: any) {
			toast.error(error.message)
			console.log("Error in createMeeting:", error.message);
			setIsLoading(false)
		}
	};

	return (
		<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
			<HomeCard
				imgURL="/icons/add-meeting.svg"
				color="bg-orange-1"
				title="New Meeting"
				text="Setup a new recording"
				handleClick={() => setMeetingState("isInstantMeeting")}
			/>
			<HomeCard
				imgURL="/icons/join-meeting.svg"
				color="bg-purple-1"
				title="Join Meeting"
				text="via invitation link"
				handleClick={() => setMeetingState("isJoiningMeeting")}
			/>
			<HomeCard
				imgURL="/icons/schedule.svg"
				color="bg-purple-2"
				title="Schedule Meeting"
				text="Plan your meeting"
				handleClick={() => setMeetingState("isScheduleMeeting")}
			/>
			<HomeCard
				imgURL="/icons/recordings.svg"
				color="bg-yellow-1"
				title="View Recordings"
				text="Meeting recordings"
				handleClick={() => router.push("/recordings")}
			/>

			<MeetingModal
				isOpen={meetingState === "isInstantMeeting"}
				onClose={() => setMeetingState(undefined)}
				title="Start an Instant Meeting"
				buttonText="Start Meeting"
				handleClick={createMeeting}
				isLoading={isLoading}
			/>
		</section>
	);
};

export default MeetingTypeList;
