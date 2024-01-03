import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOptions, addOption, removeOption, updateOptionName } from '../../slices/question';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';


const OptionalQuestion = () => {
	const dispatch = useDispatch();
	const formType = useSelector((state) => state.question.formType);
	const options = useSelector((state) => state.question.options);
	const [value, setValue] = React.useState('');

	const handleOptionChange = (id) => {
		const updatedOptions = options.map((option) =>
			option.id === id ? { ...option } : option
		);

		dispatch(updateOptions(updatedOptions));
	};

	const handleOptionNameChange = (id, newName) => {
		dispatch(updateOptionName({ id, newName }));
	};

	const handleAddOption = () => {
		dispatch(addOption({ id: Date.now().toString(), name: `옵션${options.length + 1}` }));
		setValue('');
	};

	const handleRemoveOption = (id) => {
		dispatch(removeOption(id));
	};

	const showOptionalQuestion = (option) => {
		switch (formType) {
			case '객관식 질문':
				return (
					<Radio
						disabled
						onChange={() => handleOptionChange(option.id)}
						name={`radio-${option.id}`}
					/>
				)
			case '체크박스':
				return (
					<Checkbox
						disabled
						onChange={() => handleOptionChange(option.id)}
						name={`checkbox-${option.id}`}
					/>
				);
			case '드롭다운':
				return <div className="dropdown-option"></div>;
			default:
				return;
		}
	}
	return (
		<FormControl sx={{ width: '100%' }}>
			{options.map((option) => (
				<div key={option.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
					{showOptionalQuestion(option)}
					<TextField
						value={option.name || ''}
						fullWidth
						variant="standard"
						onChange={(e) => handleOptionNameChange(option.id, e.target.value)}
						InputProps={{
							endAdornment: <ClearIcon onClick={() => handleRemoveOption(option.id)} />,
						}}
					/>
				</div>
			))}
			<button variant="outlined" onClick={handleAddOption}>
				옵션 추가
			</button>
		</FormControl>

	);
};

export default OptionalQuestion;
