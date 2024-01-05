import { useDispatch } from 'react-redux';
import { updateOptions, addOption, removeOption, updateOptionName, Option, Question } from '../../slices/form.ts';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

type Props = {
	item: Question
}

const OptionalQuestion = ({ item }: Props) => {
	const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const isPreview = pathname === '/preview';
	const { options, formType, isRequired } = item;


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

  const handleAddTextfield = () => {
    dispatch(addOption({
      id: item.id,
      option: { id: `option-${uuidv4()}`, name: `기타...` }
    }));
  }
	const showOptionalQuestion = (option: Option) => {
		switch (formType) {
			case '객관식 질문':
				return (
					<Radio
						disabled={!isPreview}
						onChange={() => handleOptionChange(option.id)}
						name={`radio-${option.id}`}
					/>
				)
			case '체크박스':
				return (
					<Checkbox
            disabled={!isPreview}
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
    <>
      <FormControl sx={{ width: '100%' }}>
        {options.map((option) => (
          <div key={option.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            {showOptionalQuestion(option)}
            <TextField
              value={option.name || ''}
              fullWidth
              variant="standard"
              disabled={isPreview}
              onChange={(e) => handleOptionNameChange(option.id, e.target.value)}
              InputProps={{
                disableUnderline: true,
                endAdornment:
                  !isPreview && (<ClearIcon
                    sx={{
                      color: 'rgb(95,99,104)',
                      padding: '5px',
                      '&:hover': {
                        backgroundColor: 'rgb(248, 249, 250)',
                        borderRadius: '50%',
                        cursor: 'pointer'
                      },
                    }}
                    onClick={() => handleRemoveOption(option.id)}
                  />),
                sx: {
                  fontSize: '11pt',
                  '&:hover': {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                  },
                },
              }}
            />
          </div>
        ))}
        {
          !isPreview && (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '11pt' }}>
              <Button variant="text" onClick={handleAddOption} style={{ color: 'rgba(0, 0, 0, 0.42)', fontSize: 'inherit' }}>
                옵션 추가
              </Button>
              또는
              <Button variant="text" onClick={handleAddTextfield} style={{ fontSize: 'inherit' }}>
                '기타'추가
              </Button>
            </div>
          )
        }
      </FormControl>
    </>
	)
};

export default OptionalQuestion;
