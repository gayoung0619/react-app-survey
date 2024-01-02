// MultipleChoiceForm.js
import React from 'react';

const MultipleChoiceForm = () => {
	return (
		<div>
			{/* 객관식 질문 폼의 내용 */}
			<label>객관식 질문:</label>
			<input type="radio" name="choice" value="option1" />
			<label>Option 1</label>
			<input type="radio" name="choice" value="option2" />
			<label>Option 2</label>
			{/* 다른 객관식 옵션들 추가 */}
		</div>
	);
};

export default MultipleChoiceForm;
