import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addForm, updateFormOrder } from '../../slices/form'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import Wrapper from "./Wrapper.jsx";
import Card from './Card';
import TitleForm from "../Formbox/TitleForm.jsx";

import FormContainer from "../Layout/FormContainer.jsx"
import classes from './DragArea.module.css';
import {useLocation} from "react-router-dom";

const DragArea = () => {
	const location = useLocation();
	const { pathname } = location;
	const isPreview = pathname === '/preview';
	const dispatch = useDispatch();
	const items = useSelector((state) => state.form.items );
	const question = useSelector((state) => state.question );

	const handleDragEnd = (result) => {
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
		</Wrapper>
	);
};

export default DragArea;
