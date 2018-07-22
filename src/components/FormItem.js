import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const formItemSource = {
	beginDrag(props) {
		console.log('start drag item');
		return {
			group: props.group,
			id: props.id,
			title: props.title,
		};
	},
	endDrag(props, monitor) {
		const dropResult = monitor.getDropResult();
		if (dropResult) {
			console.log('drop result success!');
		}
	},
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}

class FormItem extends Component {
	render() {
		const { connectDragSource, isDragging } = this.props;
		return connectDragSource(
			<div {...this.props} className="form-item">
				{this.props.children}
			</div>
		);
	}
}

export default DragSource('formItem', formItemSource, collect)(FormItem);
