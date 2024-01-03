import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {Link, useLocation} from 'react-router-dom';

import classes from './floatingBar.module.css'
import {v4 as uuidv4} from "uuid";
import { addForm } from "../../slices/form.jsx";
import { useDispatch } from "react-redux";
import {useEffect} from "react";
const FloatingBar = () => {
	const location = useLocation();
	const { pathname } = location;
	const isPreview = pathname === '/preview';
	const dispatch = useDispatch();

	const handleAddButtonClick = () => {
		const newItem = { id: `item-${uuidv4()}` };
		dispatch(addForm(newItem));
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