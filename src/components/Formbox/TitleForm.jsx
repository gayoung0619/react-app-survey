import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { updateTitle, updateDetail } from "../../slices/question.jsx";

const TitleForm = () => {
	const dispatch = useDispatch();
	const handleTitleChange = (event) => {
		dispatch(updateTitle(event.target.value));
	}
	const handleDetailChange = (event) => {
		dispatch(updateDetail(event.target.value));
	}
	return (
		<Box
			component="form"
		>
			<TextField
				id="standard-basic"
				variant="standard"
				type="text"
				className="inputs__title"
				placeholder="제목 없는 설문지"
				name="title"
				sx={{ width: '100%' }}
				onChange={handleTitleChange}
			/>
			<TextField
				id="standard-basic"
				variant="standard"
				type="text"
				className="inputs__detail"
				placeholder="설문지 설명"
				name="detail"
				sx={{ width: '100%' }}
				onChange={handleDetailChange}
			/>
		</Box>
	)
}
export default TitleForm;