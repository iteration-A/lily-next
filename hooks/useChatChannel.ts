import { useState, useEffect } from "react";
import { Socket, Channel } from "phoenix";
import axios from '../lib/axios';

type useChatChannel = (
  username: string,
  token: string
) => [Channel | null, boolean, string | null];
const useChatChannel: useChatChannel = (username, token) => {
  const [channel, setChannel] = useState<Channel | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

	const [roomId, setRoomId] = useState<null|number>(null)
	useEffect(() => {
		if (!username) return;
		axios(`/chats/${username}`)
			.then(({ data }) => {
				setRoomId(data.chat_id);
			})
		.catch(console.error)
	}, [username])

  // connects to channel
  useEffect(() => {
    if (!roomId) return;
    if (!token) return;
    if (channel) return;

    const socket = new Socket(
      `${process.env.NEXT_PUBLIC_API_URL_SOCKET}/socket`,
      {
        params: {
          token,
        },
      }
    );

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
      channel.leave();
      socket.disconnect();
    };
  }, [roomId, token]);

  return [channel, loading, error];
};

export default useChatChannel;
