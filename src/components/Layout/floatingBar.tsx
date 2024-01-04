import Fab from '@mui/material/Fab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Link } from 'react-router-dom';

import classes from './floatingBar.module.css'
import { addForm } from "../../slices/form.ts";
import { useDispatch } from "react-redux";
const FloatingBar = () => {
	const dispatch = useDispatch();

	const handleAddButtonClick = () => {
		dispatch(addForm()); 
	};
	return (
		<div className={classes.floatingbar}>
			<Fab onClick={handleAddButtonClick}>
				<AddCircleOutlineIcon />
			</Fab>
			<Link to='/preview'>
				<Fab color="primary" aria-label="preview">
					<RemoveRedEyeOutlinedIcon />
				</Fab>
			</Link>
		</div>
	)
}
export default FloatingBar;