import type { NextPage } from "next";
import axios from "../lib/axios";
import LoginDisabled from '../components/LoginDisabled';

const Login: NextPage = ({ settings }) => {
  const { allow_registration } = settings;

	if (!allow_registration) return <LoginDisabled />;

  return (
    <div>
      <h1>Login</h1>

      {!allow_registration && (
        <h3>Registration is not allowed at the moment.</h3>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await axios("/settings");
  return {
    props: {
      settings: data,
    },
  };
}

export default Login;
