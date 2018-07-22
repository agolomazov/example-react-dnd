import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const formGroupSource = {
	beginDrag(props) {
		console.log('start drag group');
		return {
			column: props.column,
			id: props.id,
			title: props.title,
		};
	},
	endDrag(props, monitor) {
		const item = monitor.getItem(); // получаем FormGroup
		const dropResult = monitor.getDropResult(); //
		if (dropResult) {
			props.onMove();
		}
	},
};

const formGroupTarget = {
	drop(props) {
		return {
			title: props.title,
			id: props.id,
			column: props.column,
		};
	},
};

function collectTarget(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}

function collectDropped(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	};
}

class FormGroup extends Component {
	render() {
		const { connectDragSource, connectDropTarget, isOver, isDragging, canDrop } = this.props;
		return connectDragSource(
			connectDropTarget(
				<div
					className="form-group"
					style={{
						opacity: isDragging ? 0 : 1,
						backgroundColor: isOver && canDrop ? '#ececec' : 'white',
					}}
				>
					<h4>{this.props.title}</h4>
					{this.props.children}
				</div>
			)
		);
	}
}

const DraggedFormGroup = DragSource('formGroup', formGroupSource, collectTarget)(FormGroup);

const DroppedFormGroup = DropTarget('formItem', formGroupTarget, collectDropped)(DraggedFormGroup);

export default DroppedFormGroup;
