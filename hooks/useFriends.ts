import { useState, useEffect } from "react";
import axios from "../lib/axios";
import User from "../types/User.interface";

const useFriends: () => [User[], boolean, string | null, () => void] = () => {
  const [friends, setFriends] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

	const fetchFriends = () => {
    axios("/friends")
      .then(({ data }) => {
        setFriends(data);
      })
      .catch(() => {
        setError("An error occurred while fetching friends...");
      })
      .finally(() => setLoading(false));
	}
  useEffect(fetchFriends, []);

  return [friends, loading, error, fetchFriends];
};

export default useFriends;
