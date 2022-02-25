import { useState, useEffect } from "react";
import { Socket } from "phoenix";

type useSocket = (token: string | null) => Socket | null;
const useSocket: useSocket = (token) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    if (!token) return;
    setSocket(
      new Socket(`${process.env.NEXT_PUBLIC_API_URL_SOCKET}/socket`, {
        params: {
          token,
        },
      })
    );
  }, [token]);

  return socket;
};

export default useSocket;
