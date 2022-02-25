import type { NextPage } from "next";
import Head from "next/head";
import styles from "./app.module.css";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome!</title>
      </Head>
			<Layout>
				<h1>Hello</h1>
			</Layout>
    </div>
  );
};

export default Home;
