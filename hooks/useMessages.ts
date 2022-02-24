import { useState, useEffect } from "react";
import { Channel } from "phoenix";

interface Message {
  message: string;
  from: number;
}
type useMessages = (channel: Channel | null) => Message[];
const useMessages: useMessages = (channel) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!channel) return;

		const addMessage = (message: Message) => setMessages([...messages, message])
    channel.on("new_message", addMessage);

		return () => {
			channel.off("new_message")
		}
  }, [channel, messages]);

  return messages;
};

export default useMessages;
