import FilledInput from "@mui/material/FilledInput";
import LoadingButton from "@mui/lab/LoadingButton";
import useInput from "../hooks/useInput";
import axios from "../lib/axios";
import { FC, FormEventHandler, useState } from "react";
import { useSnackbar } from "notistack";
import User from "../types/User.interface";

type Props = {
  user: User;
  onNewFriend: () => void | undefined;
};
const AddFriend: FC<Props> = ({ user, onNewFriend }) => {
  const [username, setUsername, clearUsername] = useInput();

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const addFriendHandler: FormEventHandler = (event) => {
    event.preventDefault();

    if (username === user.username) {
      enqueueSnackbar("You cannot be friends with yourself...", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    axios
      .post("/friends", { friend: username })
      .then(() => {
        enqueueSnackbar(`${username} is now your friend!`, {
          variant: "success",
        });
        clearUsername();
        onNewFriend && onNewFriend();
      })
      .catch((error) => {
        console.log(error.response);
        let errorMessage = null;
        switch (error.response.status) {
          case 404:
            errorMessage = `It looks like '${
              username || "<no username>"
            }' doesn't exist yet...`;
            break;
          case 422:
            errorMessage = `You are already friends with ${username}!`;
            break;
          default:
            errorMessage = "Something went wrong...";
        }

        enqueueSnackbar(errorMessage, {
          variant: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <form onSubmit={addFriendHandler}>
        <FilledInput autoFocus onChange={setUsername} value={username} />
        <LoadingButton
          type="submit"
          onClick={addFriendHandler}
          variant="contained"
          color="success"
          loading={loading}
          disabled={loading || !username}
        >
          Add friend
        </LoadingButton>
      </form>
    </div>
  );
};

export default AddFriend;
