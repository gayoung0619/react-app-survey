import React from 'react';
import { useDispatch } from 'react-redux';
import { Question, updateFormType, updateQuestion } from '../../slices/form.ts';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';        
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from "@mui/material";

import NarrativeQuestion from '../Formbox/NarrativeQuestion.tsx';
import OptionalQuestion from '../Formbox/OptionalQuestion.tsx';
import TextField from "@mui/material/TextField";
import ControlButton from "../Formbox/ControlButton.tsx";
import { useLocation } from "react-router-dom";


type Props = {
	item: Question
}

const FormContainer = ({ item }: Props) => {
	const location = useLocation();
	const { pathname } = location;
	const isPreview = pathname === '/preview';
	const dispatch = useDispatch();

	const renderForm = () => {
		if (item.formType === '단답형' || item.formType === '장문형') {
			return <NarrativeQuestion item={item} />;
		}
		if (item.formType === '객관식 질문' || item.formType === '체크박스' || item.formType === '드롭다운') {
			return <OptionalQuestion item={item} />;
		}
	};

	const handleSelectChange = (event: SelectChangeEvent) => {
		const formType = event.target.value;
		dispatch(updateFormType({ id: item.id, formType }));
	};

	const handleQuestionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const question = event.target.value;
		dispatch(updateQuestion({ id: item.id, question }));
	}

	return (
		<div>
			{
				isPreview ? (
					<div>
						<p>{item.question}</p>
						<p>{item.formType}</p>
					</div>
				) : (
					<div>
						<TextField
							id="standard-basic"
							variant="standard"
							type="text"
							className="inputs__title"
							placeholder="질문"
							name="question"
							sx={{ width: '80%', backgroundColor: 'rgb(248, 249, 250)', marginBottom: '8px' }}
							InputProps={{
								style: { padding: '16px' } // 원하는 padding 값을 지정합니다.
							}}
							value={item.question}
							onChange={handleQuestionChange}
						/>
						<FormControl sx={{ m: 1, height: 'auto' }}>
							<Select
								onChange={handleSelectChange}
								value={item.formType}
								inputProps={{ 'aria-label': '질문 유형' }}
								style={{
									minWidth: '120px'
								}}
							>
								<MenuItem value="단답형">단답형</MenuItem>
								<MenuItem value="장문형">장문형</MenuItem>
								<MenuItem value="객관식 질문">객관식 질문</MenuItem>
								<MenuItem value="체크박스">체크박스</MenuItem>
								<MenuItem value="드롭다운">드롭다운</MenuItem>
							</Select>
						</FormControl>
            {renderForm()}
            <ControlButton item={item} />
					</div>
				)
			}
		</div>
	)
}
export default FormContainer;