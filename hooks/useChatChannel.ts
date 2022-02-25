import { useState, useEffect } from "react";
import { Socket, Channel } from "phoenix";
import axios from "../lib/axios";

type args = {
  username: string,
	socket: Socket|null
}
type useChatChannel = (args: args) => [Channel | null, number | null, boolean, string | null];
const useChatChannel: useChatChannel = ({ username, socket }) => {
  const [channel, setChannel] = useState<Channel | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [roomId, setRoomId] = useState<null | number>(null);
  useEffect(() => {
    if (!username) return;
    axios(`/chats/${username}`)
      .then(({ data }) => {
        setRoomId(Number(data.chat_id));
      })
      .catch(console.error);
  }, [username]);

  // connects to channel
  useEffect(() => {
    if (!roomId) return;
    if (!socket) return;
    if (channel) return;

    socket.connect();
    const _channel = socket.channel(`room:${roomId}`);
    _channel
      .join()
      .receive("ok", () => {
        setChannel(_channel);
        setLoading(false);
      })
      .receive("error", (error) => {
        setError(error.reason);
        setLoading(false);
      });

    // disconnect socket
    return () => {
      if (!socket) return;
      if (!channel) return;
      (channel as Channel).leave();
    };
  }, [roomId, socket]);

  return [channel, roomId, loading, error];
};

export default useChatChannel;
