import Navbar from "../components/Navbar";
import FriendList from "../components/FriendList";
import useFriends from "../hooks/useFriends";
import { FC, ReactNode } from "react";
import styles from "./Layout.module.css";

type Props = {
  children: ReactNode;
};
const Layout: FC<Props> = ({ children }) => {
  const [friends, loadingFriends, errorFriends] = useFriends();

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        <div>{children}</div>
        <FriendList
          friends={friends}
          loading={loadingFriends}
          error={errorFriends}
        />
      </div>
    </div>
  );
};

export default Layout;
