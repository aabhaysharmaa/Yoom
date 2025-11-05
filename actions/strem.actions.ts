"use server"
import { randomUUID } from "crypto";
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { config } from "dotenv"
config();
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;


export const tokenProvider = async () => {
	const user = await currentUser();

	if (!user) throw new Error("user is not logged in");
	if (!apiKey) throw new Error("No API Key");
	if (!apiSecret) throw new Error("No API Secret");

	const streamClient = new StreamClient(apiKey, apiSecret);
	const callType = "default";
	const callId = randomUUID();
	const call = streamClient.video.call(callType, callId)
	await call.create({ data: { created_by_id: user.id } });
	const token = streamClient.generateUserToken({ user_id: user.id })
	return token 
}
