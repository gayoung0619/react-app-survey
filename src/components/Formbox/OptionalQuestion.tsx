import { useDispatch } from 'react-redux';
import { updateOptions, addOption, removeOption, updateOptionName, updateOptionOrder, Option, Question } from '../../slices/form.ts';
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from "uuid";
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {useState} from "react";

type Props = {
	item: Question
}

const OptionalQuestion = ({ item }: Props) => {
	const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const isPreview = pathname === '/preview';
	const { options, formType } = item;
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    dispatch(updateOptions({
      id: item.id,
      checkedOption: event.target.value as string,
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const updatedOptions = Array.from(item.options);
    const [movedItem] = updatedOptions.splice(result.source.index, 1);
    updatedOptions.splice(result.destination.index, 0, movedItem);

    dispatch(updateOptionOrder({ questionId: item.id, newOptions: updatedOptions }));
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
            <div style={{ padding: '12px'}}>{index + 1}</div>
          )
        );
			default:
				return;
		}
	}

	return (
    <>
      <FormControl sx={{ width: '100%' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {options.map((option, index) => (
                  <Draggable key={option.id} draggableId={option.id} index={index}  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          ...provided.draggableProps.style,
                        }}
                        onMouseEnter={() => setHoveredOption(index)}
                        onMouseLeave={() => setHoveredOption(null)}
                      >
                        {(hoveredOption === index || snapshot.isDragging) && (
                          <DragIndicatorIcon
                            style={{
                              position: 'absolute',
                              left: '-10px',
                              color: 'rgba(0, 0, 0, 0.2)',
                              fontSize: 'medium',
                            }}
                          />
                        )}
                        {showOptionalQuestion(option, index)}
                        {
                          isPreview && formType === '드롭다운' || (
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
                          )
                        }
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
