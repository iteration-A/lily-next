import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import useInput from "../../hooks/useInput";
import useChatChannel from "../../hooks/useChatChannel";
import useChatToken from "../../hooks/useChatToken";
import useMessages from "../../hooks/useMessages";
import Loading from "../../components/Loading";
import { FormEventHandler, useEffect } from "react";

const Chat: NextPage = () => {
  const router = useRouter();
  const { user: username } = router.query;
	const [chatToken] = useChatToken();
  const [channel, roomId, loading, error] = useChatChannel(username as string, chatToken as string);
  const messages = useMessages(channel, roomId);

  const [message, setMessage] = useInput();
	useEffect(() => {
		setMessage("");
	}, [messages])
  const sendMessageHandler: FormEventHandler = (e) => {
    e.preventDefault();

    channel!.push("new_message", { message: message });
  };

  if (loading) return <Loading />;
  if (error) return <h1>{error}</h1>;

  return (
    <Layout>
      <Typography variant="h2">{username}</Typography>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.body}</li>
        ))}
      </ul>
      <form onSubmit={sendMessageHandler}>
        <OutlinedInput
          value={message}
          onChange={setMessage}
          placeholder="Say hi"
        />
        <Button>Send</Button>
      </form>
    </Layout>
  );
};

export default Chat;
