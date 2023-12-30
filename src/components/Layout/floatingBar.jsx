import * as React from 'react';
import Fab from '@mui/material/Fab';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import classes from './floatingBar.module.css'
const FloatingBar = () => {
	return (
		<div className={classes.floatingbar}>
			<Fab color="primary"  aria-label="preview">
				<RemoveRedEyeOutlinedIcon />
			</Fab>
		</div>
	)
}
export default FloatingBar;