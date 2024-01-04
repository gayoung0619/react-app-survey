import { useDispatch, useSelector } from "react-redux";
import { updateFormOrder } from '../../slices/form.ts'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import Wrapper from "./Wrapper.jsx";
import Card from './Card.js';
import TitleForm from "../Formbox/TitleForm.tsx";

import FormContainer from "./FormContainer.tsx"
import classes from './DragArea.module.css';

import { RootState } from "../../store";

const DragArea = () => {
	const dispatch = useDispatch();
	const items = useSelector((state: RootState) => state.form.items );

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		const updatedItems = Array.from(items);
		const [movedItem] = updatedItems.splice(result.source.index, 1);
		updatedItems.splice(result.destination.index, 0, movedItem);

		dispatch(updateFormOrder(updatedItems));
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
		</Wrapper>
	);
};

export default DragArea;
