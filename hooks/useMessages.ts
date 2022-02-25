import { useState, useEffect } from "react";
import { Channel } from "phoenix";
import axios from "../lib/axios";

interface Message {
  body: string;
  from: number;
  to: number;
  id: number;
}
type useMessages = (
  channel: Channel | null,
  roomId: number | null
) => Message[];
const useMessages: useMessages = (channel, roomId) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!roomId) return;

    axios(`/messages/${roomId}`)
      .then(({ data }) => setMessages(data))
      .catch(console.error);
  }, [roomId]);

  useEffect(() => {
    if (!channel) return;

    const addMessage = ({ message }: { message: Message }) =>
      setMessages([...messages, message]);
    channel.on("new_message", addMessage);
    channel.on("presence_diff", console.log);

    return () => {
      channel.off("new_message");
    };
  }, [channel, messages]);

  return messages;
};

export default useMessages;
