import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    if (!client || !user?.id) return;

    const loadCalls = async () => {
      setIsLoading(true);
      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });
        setCalls(calls);
      } catch (error: any) {
        console.error("Error loading calls:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  // ✅ Filter ended calls
  const endedCalls = calls.filter(({ state }) => {
    const startsAt = state.startsAt ? new Date(state.startsAt) : null;
    const endedAt = state.endedAt ? new Date(state.endedAt) : null;
    return (startsAt && startsAt < now) || !!endedAt;
  });

  // ✅ Filter upcoming calls
  const upcomingCalls = calls.filter(({ state }) => {
    const startsAt = state.startsAt ? new Date(state.startsAt) : null;
    return startsAt && startsAt > now;
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls, // or rename to allCalls if it’s all calls
    isLoading,
  };
};
