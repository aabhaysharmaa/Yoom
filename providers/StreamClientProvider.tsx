import { tokenProvider } from "@/actions/strem.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import {
	StreamVideo,
	StreamVideoClient,
} from "@stream-io/video-react-sdk";

import dotenv from "dotenv";
import { ReactNode, useEffect, useState } from "react";
dotenv.config();



const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = (
	{ children }: { children: ReactNode }
) => {
	const [videoClient, setVideoClient] = useState<StreamVideoClient>();
	const { user, isLoaded } = useUser();

	useEffect(() => {
		if (!user || !isLoaded) return;
		if (!apiKey) throw new Error("Stream APIKey ")
		const client = new StreamVideoClient({
			apiKey,
			user: {
				id: user?.id,
				name: user?.username || user?.id,
				image: user?.imageUrl
			},
			tokenProvider
		});
		setVideoClient(client);
    return client.disconnectUser(); 
	}, [user, isLoaded]);
	if (!videoClient) <Loader />
	return (
		<StreamVideo client={videoClient}>
			{children}
		</StreamVideo>
	);
};

export default StreamVideoProvider