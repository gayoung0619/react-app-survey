import React from 'react';
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Card from './Card';

import classes from './DragArea.module.css';
import InputTitleField from "../Inputbox/InputTitleField.jsx";
import InputSelection from "../Inputbox/InputSelection.jsx";
import InputNarrativeQuestion from "../Inputbox/InputNarrativeQuestion.jsx";
import InputOptionalQuestion from "../Inputbox/InputOptionalQuestion.jsx";

const initialItems = [
	{ id: 'item-1' },
];

const DragArea = () => {
	const [items, setItems] = useState(initialItems);

	const handleDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const updatedItems = Array.from(items);
		const [movedItem] = updatedItems.splice(result.source.index, 1);
		updatedItems.splice(result.destination.index, 0, movedItem);

		setItems(updatedItems);

	};



	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<div className={classes.itemWrap} {...provided.droppableProps} ref={provided.innerRef}>
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
												<InputTitleField />
												{/*<InputSelection />*/}
												{/*<InputNarrativeQuestion />*/}
												{/*<InputOptionalQuestion />*/}
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
