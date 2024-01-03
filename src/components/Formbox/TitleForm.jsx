import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { updateTitle, updateDetail } from "../../slices/question.jsx";
import { useLocation } from "react-router-dom";

import classes from "./TitleForm.module.css";

const TitleForm = () => {
	const location = useLocation();
	const { pathname } = location;
	const isPreview = pathname === '/preview';

		const theme = useTheme();
		const dispatch = useDispatch();
		const question = useSelector((state) => state.question);
		const handleTitleChange = (event) => {
			dispatch(updateTitle(event.target.value));
		}
		const handleDetailChange = (event) => {
			dispatch(updateDetail(event.target.value));
		}
		return (
			<Box
				component="form"
				sx={{
						'::before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '10px',
							backgroundColor: theme.palette.purple.main,
							borderRadius: '8px 8px 0 0'
						}
					}}
					>
				{
					isPreview ? (
						<div className={classes.preview}>
							<p className={classes.title} style={{ fontSize: '24pt', marginBottom: '8px' }}>{question.titleData.title}</p>
							<p className={classes.detail}>{question.titleData.detail}</p>
						</div>
					) : (
						<>
							<TextField
								id="standard-basic"
								variant="standard"
								type="text"
								className="inputs__title"
								placeholder="제목 없는 설문지"
								name="title"
								fullWidth
								inputProps={{ style: { fontSize: '2rem' } }}
								sx={{ marginBottom: '8px' }}
								onChange={handleTitleChange}
								value={question.titleData.title}
							/>
							<TextField
								id="standard-basic"
								variant="standard"
								type="text"
								className="inputs__detail"
								placeholder="설문지 설명"
								name="detail"
								fullWidth
								onChange={handleDetailChange}
								value={question.titleData.detail}
							/>
						</>
					)
				}
			</Box>
		)
	}
export default TitleForm;