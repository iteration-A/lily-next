import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import User from "../types/User.interface";
import axios from "../lib/axios";
import Loading from "../components/Loading";
import styles from "./app.module.css";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import AddFriend from "../components/AddFriend";
import FriendList from "../components/FriendList";
import useFriends from "../hooks/useFriends";

const Home: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [friends, loadingFriends, errorFriends, refetchFriends] = useFriends();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    axios("/profiles", { withCredentials: true })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.status === 401
            ? "You need to log in to access this page"
            : "An error ocurred!";

        enqueueSnackbar(errorMessage, { variant: "error" });
        router.push("/log-in");
      });
  }, []);

  if (!user) return <Loading />;

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome!</title>
      </Head>
      <Navbar />

      <h1>Welcome back, {user.first_name}!</h1>

      <AddFriend user={user} onNewFriend={refetchFriends} />
			<FriendList friends={friends} loading={loadingFriends} error={errorFriends} />
    </div>
  );
};

export default Home;
