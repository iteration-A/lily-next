import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "../lib/axios";
import LoginDisabled from "../components/LoginDisabled";
import loginSchema from "../schemaValidations/login";

interface Settings {
  allow_registration?: boolean;
}

const Login: NextPage = ({
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { allow_registration } = settings;

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });
  const submitHandler = (data) => console.log(data);

  if (!allow_registration) return <LoginDisabled />;

  console.log(errors);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <OutlinedInput
          placeholder="Username"
          error={Boolean(errors.password)}
          {...register("username")}
        />
        {errors.username?.message && (
          <Typography variant="subtitle1" color="crimson">
            {errors.username?.message}
          </Typography>
        )}

        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          error={Boolean(errors.password)}
          id="password"
          placeholder="Password"
          type={passwordVisible ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setPasswordVisible(!passwordVisible)}
                edge="end"
              >
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...register("password")}
        />
        {errors.password?.message && (
          <Typography variant="subtitle1" color="crimson">
            {errors.password?.message}
          </Typography>
        )}

        <Button type="submit">Log in</Button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios("/settings");
  return {
    props: {
      settings: data as Settings,
    },
  };
};

export default Login;
