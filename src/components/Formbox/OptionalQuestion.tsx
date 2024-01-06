import React from 'react';
import { useDispatch } from 'react-redux';
import { updateOptions, addOption, removeOption, updateOptionName, Option, Question } from '../../slices/form.ts';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
	const { options, formType } = item;


	const handleOptionChange = (name: string) => {
		dispatch(updateOptions({
      id: item.id,
      checkedOption: name
    }));
	};

	const handleOptionNameChange = (optionId: string, newName: string) => {
		dispatch(updateOptionName({
			id: item.id,
			optionId,
			newName
		}));
	};

	const handleAddOption = () => {
    const newOption = { id: `option-${uuidv4()}`, name: `옵션${options.length + 1}`, textDisabled: false }
		dispatch(addOption({
			id: item.id,
			option: newOption
		}));
	};

	const handleRemoveOption = (optionId: string) => {
		dispatch(removeOption({
			id: item.id,
			optionId
		}));
	};

  const handleAddTextfield = () => {
    const newOption = { id: `option-${uuidv4()}`, name: '기타...',  textDisabled: true };
    dispatch(addOption({
      id: item.id,
      option:  newOption
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(updateOptions({
      id: item.id,
      checkedOption: event.target.value as string,
    }));
  };

	const showOptionalQuestion = (option: Option, index: number) => {
		switch (formType) {
			case '객관식 질문':
				return (
          <Radio
            disabled={!isPreview}
            checked={option.name === item.checkedOption}
            onChange={() => handleOptionChange(option.name)}
            name={`radio-${item.question}`}
            value={option.name}
          />
				)
			case '체크박스':
				return (
					<Checkbox
            disabled={!isPreview}
						onChange={() => handleOptionChange(option.name)}
						name={`checkbox-${item.question}`}
            value={option.name}
					/>
				);
			case '드롭다운':
        return (
          isPreview || (
            <div style={{ padding: '12px' }}>{index + 1}</div>
          )
        );
			default:
				return;
		}
	}

	return (
    <>
      <FormControl sx={{ width: '100%' }}>
        {options.map((option, index) => (
          <div key={option.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            {showOptionalQuestion(option, index)}
            <TextField
              value={option.name || ''}
              fullWidth
              variant="standard"
              disabled={isPreview? !option.textDisabled : option.textDisabled}
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
          ))
        }

        {isPreview && formType === '드롭다운' &&  (
          <Select value={item.checkedOption} onChange={handleSelectChange}>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.name}>{option.name}</MenuItem>
            ))}
          </Select>
        )}
        {
          !isPreview && (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '11pt' }}>
              <Button variant="text" onClick={handleAddOption} style={{ color: 'rgba(0, 0, 0, 0.42)', fontSize: 'inherit' }}>
                옵션 추가
              </Button>
              {
                formType === '드롭다운' || (
                  <>
                    또는
                    <Button variant="text" onClick={handleAddTextfield} style={{ fontSize: 'inherit' }}>
                      '기타'추가
                    </Button>
                  </>
                )
              }
            </div>
          )
        }
      </FormControl>
    </>
	)
};

export default OptionalQuestion;
