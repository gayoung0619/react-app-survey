import { useDispatch } from 'react-redux';
import { updateOptions, addOption, removeOption, updateOptionName, Option, Question } from '../../slices/form.ts';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import {v4 as uuidv4} from "uuid";

type Props = {
	item: Question
}

const OptionalQuestion = ({ item }: Props) => {
	const dispatch = useDispatch();
	const { options, formType } = item;


	const handleOptionChange = (id: string) => {
		const updatedOptions = options.map((option) =>
			option.id === id ? { ...option } : option
		);

		dispatch(updateOptions(updatedOptions));
	};

	const handleOptionNameChange = (optionId: string, newName: string) => {
		dispatch(updateOptionName({
			id: item.id, 
			optionId, 
			newName 
		}));
	};

	const handleAddOption = () => {
		dispatch(addOption({
			id: item.id,
			option: { id: `option-${uuidv4()}`, name: `옵션${options.length + 1}` }
		}));
	};

	const handleRemoveOption = (optionId: string) => {
		console.log(optionId);
		dispatch(removeOption({
			id: item.id,
			optionId
		}));
	};

	const showOptionalQuestion = (option: Option) => {
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
			<button onClick={handleAddOption}>
				옵션 추가
			</button>
		</FormControl>

	);
};

export default OptionalQuestion;
