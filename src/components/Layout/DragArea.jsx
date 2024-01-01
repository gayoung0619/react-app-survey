import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addForm } from '../../slices/form'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Card from './Card';
import InputTitleField from "../Inputbox/InputTitleField.jsx";
import FormContainer from "../Layout/FormContainer.jsx"

import classes from './DragArea.module.css';

const DragArea = () => {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.form.items );
	const handleDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const updatedItems = Array.from(items);
		const [movedItem] = updatedItems.splice(result.source.index, 1);
		updatedItems.splice(result.destination.index, 0, movedItem);

		dispatch(addForm(updatedItems));
	};

	const handleAddButtonClick = () => {
		const newItem = { id: `item-${items.length + 1}` };
		dispatch(addForm(newItem));
	};

	return (
		<>
			<button onClick={handleAddButtonClick}>Add</button>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<div className={classes.itemWrap} {...provided.droppableProps} ref={provided.innerRef}>
							<div className={classes.item}>
								<Card>
									<InputTitleField />
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
												<FormContainer />
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
		</>
	);
};

export default DragArea;
