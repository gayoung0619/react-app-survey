import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updateFormOrder, resetForm, currentForm } from '../../slices/form.ts'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { RootState } from "../../store";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Button from "@mui/material/Button";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Wrapper from "./Wrapper.jsx";
import Card from './Card.js';
import TitleForm from "../Formbox/TitleForm.tsx";
import FormContainer from "./FormContainer.tsx"
import classes from './DragArea.module.css';

const DragArea = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const isPreview = pathname === '/preview';
	const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.form.items);
	const currentFormId = useSelector((state: RootState) => state.form.currentFormId);
  const [isSubmitClicked, setSubmitClicked] = useState(false); // submit 클릭 여부를 상태로 추가

  const handleCardClick = (itemId: string) => {
    dispatch(currentForm({ itemId }));
  };

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
    setSubmitClicked(true);
    const isAnyFieldEmpty = items.some((item) => {
      if (item.isRequired) {
        if (item.inputValue.trim() === '' && item.checkedOption === '') {
          return true; // 하나라도 비어 있으면 true 반환
        }
      }
      return false; // 필수가 아니거나, 비어 있지 않으면 false 반환
    });

    if (isAnyFieldEmpty) {
      console.log('필수 질문에 답하지 않아 폼을 제출할 수 없습니다.');
    } else {
      alert('폼이 제출되었습니다.');
      navigate("/");  // 홈으로 이동
      dispatch(resetForm());
    }
  };

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
											className={`${classes.item} ${
                        snapshot.isDragging ? classes.isDragging : classes.isNotDragging
                      } ${
                        currentFormId === item.id
                          ? classes.isCurrentForm
                          : classes.isNotCurrentForm
                      }`}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
                      onClick={() => handleCardClick(item.id)}
											style={{
                        ...provided.draggableProps.style,
											}}
										>
                      {isPreview || <DragIndicatorIcon className={classes.dragIndicator} />}
											<Card>
												<FormContainer item={item} />
                        {isSubmitClicked && isPreview && item.isRequired && item.inputValue.trim() === '' && item.checkedOption === '' && (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', color: 'red', marginTop: '5px', fontSize: '13px' }}>
                            <ErrorOutlineIcon style={{ marginRight: '10px' }} />필수 질문입니다
                          </div>
                        )}
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
