// CheckBoxForm.js

const CheckBoxForm = () => {
	return (
		<div>
			{/* 체크박스 폼의 내용 */}
			<label>체크박스 질문:</label>
			<input type="checkbox" name="checkboxOption1" value="option1" />
			<label>Option 1</label>
			<input type="checkbox" name="checkboxOption2" value="option2" />
			<label>Option 2</label>
			{/* 다른 체크박스 옵션들 추가 */}
		</div>
	);
};

export default CheckBoxForm;
