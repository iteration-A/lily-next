import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Image from 'next/image'
import styles from './400.module.css'

export default () => {
  const router = useRouter();

  return (
		<div className={styles.container}>
			<Typography variant="h3" textAlign="center">Looks like you are lost...</Typography>
			<Image src="/404.svg" height="400" width="400" />
      <Button onClick={() => router.push("/")}>Go back home</Button>
		</div>
  );
};
