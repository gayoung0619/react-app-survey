import { useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Question } from '../../slices/form';

type Props = {
	item: Question
}

const NarrativeQuestion = ({ item }: Props) => {
	const location = useLocation();
	const { pathname } = location;
	const isPreview = pathname === '/preview';

	return (
		<div>
			{item.formType === "단답형"? (
				<TextField
					type="text"
					variant="standard"
					disabled={!isPreview}
					placeholder="단답형 텍스트"
				/>
			) : (
				<TextareaAutosize
					disabled={!isPreview}
					placeholder="장문형 텍스트"
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
