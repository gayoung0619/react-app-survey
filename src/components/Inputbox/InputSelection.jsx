import { useState } from "react";


const InputSelection = () => {
	const [categoryList, setCategoryList] = useState([
		"단답형",
		"장문형",
		"객관식 질문",
		"체크박스",
		"드롭다운",
	]);
  return (
		<div className="form__category--box">
			<select>
				{categoryList.map((category) => (
					<option key={category} value={category}>
						{category}
					</option>
				))}
			</select>
		</div>
	)
}
export default InputSelection;