import { useState, useEffect } from "react";
import axios from "../lib/axios";
import User from "../types/User.interface";

type useUser = () => [User | null, boolean, string | null];
const useUser: useUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    axios("/profiles")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.status === 401
            ? "You need to log in to access this page"
            : "An error ocurred!";
        setError(errorMessage);
      })
      .finally(() => setLoading(false));
  }, []);

  return [user, loading, error];
};

export default useUser;
