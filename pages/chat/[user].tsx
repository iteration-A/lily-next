import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import useInput from '../../hooks/useInput';

const Chat: NextPage = () => {
  const router = useRouter();
  const { user: username } = router.query;

	const [message, setMessage] = useInput();

  return (
    <Layout>
      <Typography variant="h2">{username}</Typography>
      <Typography variant="h4">{message}</Typography>
			<OutlinedInput value={message} onChange={setMessage} placeholder="Say hi" />
			<Button>Send</Button>
    </Layout>
  );
};

export default Chat;
