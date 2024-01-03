import React from 'react';
import { useSelector } from "react-redux";

const NarrativeQuestion = () => {
	const formType = useSelector((state) => state.question.formType);

	return (
		<div>
			<input type="text" disabled placeholder={formType === "단답형"? "단담형 텍스트" : "장문형 텍스트"} />
		</div>
	);
};

export default NarrativeQuestion;
