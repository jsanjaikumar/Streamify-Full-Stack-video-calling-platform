import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { authUser } = useAuthUser();

  const { data: tokenData, error: tokenError } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
    retry: 3,
  });

  useEffect(() => {
    const initChat = async () => {
      if (tokenError) {
        console.error("Token error:", tokenError);
        setError("Failed to get authentication token");
        setLoading(false);
        toast.error("Authentication failed. Please try logging in again.");
        return;
      }

      if (!tokenData?.token || !authUser) {
        console.log("Missing tokenData or authUser:", { tokenData, authUser });
        return;
      }

      if (!STREAM_API_KEY) {
        console.error("STREAM_API_KEY is not defined");
        setError("Chat service is not configured properly");
        setLoading(false);
        toast.error("Chat service is not available. Please contact support.");
        return;
      }

      if (!targetUserId) {
        console.error("Target user ID is missing");
        setError("Invalid chat target");
        setLoading(false);
        toast.error("Cannot start chat: Invalid user");
        return;
      }

      try {
        console.log("Initializing stream chat client...");
        console.log("Auth user:", authUser._id);
        console.log("Target user:", targetUserId);

        const client = StreamChat.getInstance(STREAM_API_KEY);

        // Check if client is already connected
        if (client.user?.id === authUser._id) {
          console.log("Client already connected");
        } else {
          console.log("Connecting user to StreamChat...");
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.token
          );
          console.log("User connected successfully");
        }

        // Create or get channel
        const channelId = [authUser._id, targetUserId].sort().join("-");
        console.log("Channel ID:", channelId);

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        console.log("Watching channel...");
        await currChannel.watch();
        console.log("Channel ready");

        setChatClient(client);
        setChannel(currChannel);
        setError(null);
      } catch (error) {
        console.error("Error initializing chat:", error);
        setError(error.message || "Failed to connect to chat");
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // Cleanup function
    return () => {
      if (chatClient && chatClient.user) {
        console.log("Disconnecting chat client...");
        chatClient.disconnectUser();
      }
    };
  }, [tokenData, authUser, targetUserId, chatClient, tokenError]);

  if (loading) return <ChatLoader />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-[93vh]">
        <div className="card bg-base-200 p-8 text-center max-w-md">
          <h3 className="font-semibold text-lg mb-2">Chat Connection Failed</h3>
          <p className="text-base-content opacity-70 mb-4">{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!chatClient || !channel) return <ChatLoader />;

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
export default ChatPage;
