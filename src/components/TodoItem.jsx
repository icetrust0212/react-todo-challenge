import React, { useState, useEffect, useRef } from "react";
import { ENTER_KEY, ESCAPE_KEY } from "../constants";

const TodoItem = (props) => {
	const [text, setText] = useState(props.todo.title);
	const inputRef = useRef();

	const handleChange = (event) => {
		if (props.editing) {
			setText(event.target.value);
		}
	}

	const handleEdit = () => {
		props.onEdit();
		setText(props.todo.title);
	}

	const handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			setText(props.todo.title);
			props.onCancel(event);
		} else if (event.which === ENTER_KEY) {
			handleSubmit(event);
		}
	}

	const handleSubmit = (event) => {
		var val = text.trim();
		if (val) {
			props.onSave(val);
			setText(val);
		} else {
			props.onDestroy();
		}
	}

	/**
		 * Safely manipulate the DOM after updating the state when invoking
		 * `props.onEdit()` in the `handleEdit` method above.
	*/
	useEffect(() => {
		if (props.editing) {
			inputRef.current.focus();
			inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
		}
	})

	const getClassName = () => {
		let className = '';
		if (props.todo.completed) {
			className += ' completed';
		}
		if (props.editing) {
			className += ' editing';
		}
		return className;
	}

	return (
		<li className={getClassName()}>
			<div className="view">
				<input
					className="toggle"
					type="checkbox"
					checked={props.todo.completed}
					onChange={props.onToggle}
				/>
				<label onDoubleClick={handleEdit}>
					{props.todo.title}
				</label>
				<button className="destroy" onClick={props.onDestroy} />
			</div>
			<input
				ref={inputRef}
				className="edit"
				value={text}
				onBlur={handleSubmit}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
		</li>
	)
}

export default TodoItem