import { useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Question, updateTextValue } from '../../slices/form';
import { useDispatch } from 'react-redux';
import React from "react";

type Props = {
	item: Question
}

const NarrativeQuestion = ({ item }: Props) => {
	const location = useLocation();
	const { pathname } = location;
	const isPreview = pathname === '/preview';
  const dispatch = useDispatch();
  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    dispatch(updateTextValue({ id: item.id, inputValue: newValue }));
  }

	return (
		<div>
			{item.formType === "단답형"? (
				<TextField
					type="text"
					variant="standard"
					disabled={!isPreview}
					placeholder="단답형 텍스트"
          onChange={handleTextChange}
				/>
			) : (
				<TextareaAutosize
					disabled={!isPreview}
					placeholder="장문형 텍스트"
          onChange={handleTextChange}
					style={{
						padding: '4px 0 5px',
						width: '100%',
						fontSize: '16px',
						border: 'none',
						backgroundColor: '#fff',
						borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
						resize: 'none',
					}}
				/>
			)}
		</div>
	);
};

export default NarrativeQuestion;
