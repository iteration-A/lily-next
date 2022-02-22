import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from './index.module.css'

const Index: NextPage = () => {
  return (
		<div className={styles.container}>
			<Head>
				<title>Lily 🐞</title>
			</Head>
			
			<Typography variant="h2" align="center" mt={5}>Welcome to Lily 🐞</Typography>
			<div className={styles.buttons}>
				<Button color="info" variant="contained">
					<Link href="/sign-in">Sign in</Link>
				</Button>
				<Button color="success" variant="contained">
					<Link href="/log-in">Log in</Link>
				</Button>
			</div>

			<div className={styles.gotoAppContainer}>
				<Button color="info" variant="contained">
					<Link href="/app">Go to app</Link>
				</Button>
			</div>
		</div>
  )
}


export default Index
