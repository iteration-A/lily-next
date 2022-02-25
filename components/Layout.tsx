import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import AddFriend from "../components/AddFriend";
import FriendList from "../components/FriendList";
import useFriends from "../hooks/useFriends";
import useUser from "../hooks/useUser";
import useChatToken from "../hooks/useChatToken";
import useSocket from "../hooks/useSocket";
import React, { FC, ReactNode } from "react";
import styles from "./Layout.module.css";

export const SocketContext = React.createContext();

type Props = {
  children: ReactNode;
  showFriendList?: boolean;
  showAddFriend?: boolean;
};
const Layout: FC<Props> = ({
  children,
  showAddFriend = true,
  showFriendList = true,
}) => {
	// user info
  const [user, loading, error] = useUser();
	// redirect if not logged in
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error, { variant: "error" });
    router.push("/log-in");
  }, [error]);

	// friends info
  const [friends, loadingFriends, errorFriends, refetchFriends] = useFriends();

	// join `room` channel
  const [chatToken] = useChatToken();
	const socket = useSocket(chatToken);

  if (loading || !user) return <Loading />;

  return (
    <div className={styles.container}>
      <Navbar user={user} />
      <div className={styles.main}>
				<SocketContext.Provider value={socket}>
					<div className={styles.content}>{children}</div>
				</SocketContext.Provider>
        {showFriendList && (
          <FriendList
            friends={friends}
            loading={loadingFriends}
            error={errorFriends}
          />
        )}
        {showAddFriend && (
          <AddFriend user={user!} onNewFriend={refetchFriends} />
        )}
      </div>
    </div>
  );
};

export default Layout;
