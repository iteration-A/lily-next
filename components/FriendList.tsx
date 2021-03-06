import {FC} from "react";
import User from "../types/User.interface";
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

type Props = {
	friends: User[],
	error: string | null,
	loading: boolean
}
const FriendList: FC<Props> = ({ friends, error, loading }) => {

	const router = useRouter();

	if (loading) return <span>Fetching friends...</span>

  return (
    <div>
      <h1>Friends</h1>

      {error && <span>{error}</span>}

      <ul>
        {friends.map((friend) => (
					<li key={friend.id}>
						<span>{friend.username}</span>
						<Button onClick={() => router.push(`/chat/${friend.username}`)}>Go to chat</Button>
					</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
