import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { Socket } from "phoenix";
import { FormEventHandler, useEffect, useRef, useContext } from "react";
import useInput from "../../hooks/useInput";
import useChatChannel from "../../hooks/useChatChannel";
import useMessages from "../../hooks/useMessages";
import useUser from "../../hooks/useUser";
import styles from "./[user].module.css";
import { SocketContext } from "../../components/Layout";
import withPrivateRoute from "../../components/withPrivateRoute";

const Chat = () => {
  const socket = useContext(SocketContext);

  const router = useRouter();
  const { user: username } = router.query;
  const [channel, roomId, _loading, error] = useChatChannel({
    username: username as string,
    socket: socket as Socket,
  });
  const messages = useMessages(channel, roomId);

  const [me] = useUser();

  const [message, setMessage] = useInput();
  useEffect(() => {
    setMessage("");
  }, [messages]);
  const sendMessageHandler: FormEventHandler = (e) => {
    e.preventDefault();

    channel!.push("new_message", { message: message });
  };

  // auto scroll
  const lastMessage = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!lastMessage.current) return;
    lastMessage.current.scrollIntoView();
  }, [messages]);

  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <Typography variant="h2">{username}</Typography>
      <div className={styles.content}>
        <ul className={styles.list}>
          {messages.map((message) => (
            <li
              key={message.id}
              className={`${styles.message} ${
                message.from === me?.id && styles.mine
              }`}
              ref={lastMessage}
            >
              {message.body}
            </li>
          ))}
        </ul>
        <form onSubmit={sendMessageHandler}>
          <OutlinedInput
            sx={{ width: "80%" }}
            value={message}
            onChange={setMessage}
            placeholder="Say hi"
          />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  );
};

export default withPrivateRoute(Chat)
