import Button from "@mui/material/Button";
import axios from "../lib/axios";
import styles from "./app.module.css";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import User from "../types/User.interface";
import {FC} from "react";

type Props = {
	user: User | null
}
const Navbar: FC<Props> = ({ user }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const logoutHandler = () => {
    window.localStorage.removeItem("chatToken");
    axios
      .delete("/logout")
      .then(() => {
        enqueueSnackbar("Come back soon!", { variant: "success" });
        router.push("/");
      })
      .catch(console.error);
  };

  return (
    <div>
      {user && <h4>Hello, {user.username}</h4>}
      <Button onClick={logoutHandler} variant="contained" color="error">
        Log out
      </Button>
    </div>
  );
};

export default Navbar;
