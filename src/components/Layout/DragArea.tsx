import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetForm, updateFormOrder} from '../../slices/form.ts'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import Wrapper from "./Wrapper.jsx";
import Card from './Card.js';
import TitleForm from "../Formbox/TitleForm.tsx";

import FormContainer from "./FormContainer.tsx"
import classes from './DragArea.module.css';

import { RootState } from "../../store";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";

const DragArea = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const isPreview = pathname === '/preview';
	const dispatch = useDispatch();
	const items = useSelector((state: RootState) => state.form.items);

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		const updatedItems = Array.from(items);
		const [movedItem] = updatedItems.splice(result.source.index, 1);
		updatedItems.splice(result.destination.index, 0, movedItem);

		dispatch(updateFormOrder(updatedItems));
	};

  const handleSubmit = () => {
    items.map((item)=>{
      if (item.isRequired && item.inputValue === '' && item.checkedOption === '') {
        console.log('폼제출 안함');
      }else {
        alert('폼이 제출되었습니다.');
        navigate("/");  // 홈으로 이동
        dispatch(resetForm())
      }
    })
  }

	return (
		<Wrapper>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							<div className={classes.item}>
								<Card>
									<TitleForm />
								</Card>
							</div>

							{items.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{(provided, snapshot) => (
										<div
											className={classes.item}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={{
												backgroundColor: snapshot.isDragging ? 'rgba(255,255,255, .5)' : 'rgba(255,255,255, 1)',
												...provided.draggableProps.style,
											}}
										>
											<Card>
												{/* 다른 드래그 가능한 내용 */}
												<FormContainer item={item} />
											</Card>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
      {isPreview && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '768px', margin: '0 auto' }}>
          <Button onClick={handleSubmit} variant="contained" type="submit">제출</Button>
          <Button variant="text">양식 지우기</Button>
        </div>
      )}
		</Wrapper>
	);
};

export default DragArea;
