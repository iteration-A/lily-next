import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import User from "../types/User.interface";
import axios from "../lib/axios";
import Loading from "../components/Loading";
import styles from './app.module.css';

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // artificial delay TODO: DELETE
    setTimeout(() => {
      axios("/profiles", { withCredentials: true })
        .then(({ data }) => {
          setUser(data);
        })
        .catch(console.error);
    }, 1500);
    // axios("/profiles", { withCredentials: true })
    //   .then(({ data }) => {
    //     setUser(data);
    //   })
    //   .catch(console.error);
  }, []);

  if (!user) return <Loading />;

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome!</title>
      </Head>

      {user && <h1>Welcome back, {user.first_name}!</h1>}
    </div>
  );
};

export default Home;
