import type { NextPage } from "next";
import OutlinedInput from "@mui/material/OutlinedInput";
import LoadingButton from "@mui/lab/LoadingButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "../lib/axios";
import loginSchema from "../schemaValidations/login";
import styles from "./log-in.module.css";
import LoginInput from "../types/LoginInput.interface";

const Login: NextPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const submitHandler = (data: LoginInput) => {
    setLoading(true);

    axios
      .post("/login", { user: data }, { withCredentials: true })
      .then(() => {
        enqueueSnackbar("Logged in! You are being redirected...", {
          variant: "success",
        });
        router.push("/app");
      })
      .catch((error) => {
        setLoading(false);
        const statusCode = error.response?.status;
        const message =
          statusCode === 401
            ? "Invalid credentials"
            : "An error ocurred while login you in!";

        enqueueSnackbar(message, { variant: "error" });
      });
  };

  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <OutlinedInput
          placeholder="Username"
          error={Boolean(errors.username)}
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

        <div className={styles.submitButtonContainer}>
          <LoadingButton loading={loading} variant="contained" type="submit">
            Log in
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
