import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const columnTarget = {
	drop(props) {
		return {
			column: props.column,
		};
	},
};

function collectTarget(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	};
}

class FormColumn extends Component {
	render() {
		const { connectDropTarget, isOver, canDrop } = this.props;
		return connectDropTarget(
			<div
				className="form-column"
				style={{
					backgroundColor: isOver && canDrop ? 'lightgreen' : 'white',
				}}
			>
				<h2>{this.props.title}</h2>
				{this.props.children}
			</div>
		);
	}
}

const DropTargetedColumn = DropTarget('formGroup', columnTarget, collectTarget)(FormColumn);

export default DropTargetedColumn;
