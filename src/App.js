import React, { Component } from 'react';
import './App.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import FormColumn from './components/FormColumn';
import FormGroup from './components/FormGroup';
import FormItem from './components/FormItem';

class App extends Component {
	state = {
		columns: [
			{
				id: 123,
				title: 'Used form group',
				groups: [
					{
						id: 12,
						title: 'Personal data',
						items: [
							{
								id: 18,
								title: 'First name',
							},
							{
								id: 19,
								title: 'Last name',
							},
							{
								id: 20,
								title: 'Email item',
							},
							{
								id: 21,
								title: 'Phone item',
							},
							{
								id: 22,
								title: 'Skype item',
							},
						],
					},
					{
						id: 13,
						title: 'Work data',
						items: [
							{
								id: 23,
								title: 'Address item',
							},
							{
								id: 24,
								title: 'Contact item',
							},
							{
								id: 25,
								title: 'Company item',
							},
						],
					},
					{
						id: 14,
						title: 'Money data',
						items: [
							{
								id: 26,
								title: 'Balance item',
							},
							{
								id: 27,
								title: 'Bank item',
							},
						],
					},
				],
			},
			{
				id: 124,
				title: 'Unused form group',
				groups: [
					{
						id: 15,
						title: 'Advisor data',
						items: [
							{
								id: 28,
								title: 'Advisor Engine',
							},
						],
					},
				],
			},
		],
	};

	onMoveGroup = (group, column) => {
		console.log('move group');
	};

	onMoveItem = (item, group) => {
		console.log('move item');
	};

	render() {
		return (
			<div className="App">
				<h1>Form builder</h1>
				<div className="container">
					{this.state.columns.map(column => (
						<FormColumn key={column.id} title={column.title} column={column.id}>
							{column.groups.map(group => (
								<FormGroup
									key={group.id}
									title={group.title}
									id={group.id}
									column={column.id}
									onMove={this.onMoveGroup}
								>
									{group.items.map(item => (
										<FormItem key={item.id} group={group.id} onMove={this.onMoveItem}>
											{item.title}
										</FormItem>
									))}
								</FormGroup>
							))}
						</FormColumn>
					))}
				</div>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(App);
