import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const InputTitleField = () => {
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
			/>
			<TextField
				id="standard-basic"
				variant="standard"
				type="text"
				className="inputs__detail"
				placeholder="설문지 설명"
				name="detail"
				sx={{ width: '100%' }}
			/>
		</Box>
	)
}
export default InputTitleField;