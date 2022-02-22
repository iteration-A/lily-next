import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
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
import LoginDisabled from "../components/LoginDisabled";
import signinSchema from "../schemaValidations/signup";
import styles from "./sign-in.module.css";
import Settings from "../types/Settings.interface";
import SignInInput from "../types/SignInInput.interface";

const SignIn: NextPage = ({
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { allow_registration } = settings;

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(signinSchema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const submitHandler = (data: SignInInput) => {
    setLoading(true);

    axios
      .post("/users", { user: data }, { withCredentials: true })
      .then(() => {
        enqueueSnackbar("Account created! You are being redirected...", {
          variant: "success",
        });
        router.push("/log-in");
      })
      .catch((error) => {
        setLoading(false);
        const statusCode = error.response?.status;
        const message =
          statusCode === 400
            ? "Something is wrong, check your input"
            : "An error ocurred while signin you in!";

        enqueueSnackbar(message, { variant: "error" });
      });
  };

  const router = useRouter();

  if (!allow_registration) return <LoginDisabled />;

  return (
    <div className={styles.container}>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <InputLabel htmlFor="first_name">First name</InputLabel>
          <OutlinedInput
            id="first_name"
            placeholder="First name"
            error={Boolean(errors.first_name)}
            {...register("first_name")}
          />
          {errors.first_name?.message && (
            <Typography variant="subtitle1" color="crimson">
              {errors.first_name?.message}
            </Typography>
          )}
        </div>

        <div>
          <InputLabel htmlFor="last_name">Last name</InputLabel>
          <OutlinedInput
            id="last_name"
            placeholder="Last name"
            error={Boolean(errors.last_name)}
            {...register("last_name")}
          />
          {errors.last_name?.message && (
            <Typography variant="subtitle1" color="crimson">
              {errors.last_name?.message}
            </Typography>
          )}
        </div>

        <div>
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput
            id="username"
            placeholder="Username"
            error={Boolean(errors.username)}
            {...register("username")}
          />
          {errors.username?.message && (
            <Typography variant="subtitle1" color="crimson">
              {errors.username?.message}
            </Typography>
          )}
        </div>

        <div>
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
        </div>

        <div className={styles.submitButtonContainer}>
          <LoadingButton loading={loading} variant="contained" type="submit">
            Sign in
          </LoadingButton>
        </div>
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

export default SignIn;
