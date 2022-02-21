import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from 'react'
import NotFound from '../pages/400';

const LoginDisabled = () => {
	const [toastVisible, setToastVisible] = useState(true)
	const closeToast = () => setToastVisible(false)

  return (
    <div>
      <Snackbar
				autoHideDuration={5000}
        open={toastVisible}
				onClose={closeToast}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity="error" onClose={closeToast}>Login is disabled at this moment :(</Alert>
			</Snackbar>
			<NotFound />
    </div>
  );
};

export default LoginDisabled;
