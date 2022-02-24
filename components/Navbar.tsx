import Button from "@mui/material/Button";
import axios from "../lib/axios";
import styles from "./app.module.css";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const Navbar = () => {
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
      <Button onClick={logoutHandler} variant="contained" color="error">
        Log out
      </Button>
    </div>
  );
};

export default Navbar;
