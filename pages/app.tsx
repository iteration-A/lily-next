import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Loading from "../components/Loading";
import styles from "./app.module.css";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import AddFriend from "../components/AddFriend";
import FriendList from "../components/FriendList";
import useFriends from "../hooks/useFriends";
import useUser from "../hooks/useUser";

const Home: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [friends, loadingFriends, errorFriends, refetchFriends] = useFriends();

	const [user, loading, error] = useUser()
	useEffect(() => {
		if (!error) return;
		enqueueSnackbar(error, { variant: "error" });
		router.push("/log-in");
	}, [error])

  if (loading || !user) return <Loading />;

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome!</title>
      </Head>
      <Navbar />

      <h1>Welcome back, {user?.first_name}!</h1>

      <AddFriend user={user!} onNewFriend={refetchFriends} />
			<FriendList friends={friends} loading={loadingFriends} error={errorFriends} />
    </div>
  );
};

export default Home;
