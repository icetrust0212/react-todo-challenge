import { useEffect, useState } from "react";
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS, ENTER_KEY } from "../constants";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
    const [newTodo, setNewTodo] = useState('');
    const [nowShowing, setNowShowing] = useState(ALL_TODOS);
    const [editing, setEditing] = useState(null);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        props.model.subscribe((_todos) => setTodos(_todos));
        setTodos(props.model.todos);
    }, [props.model])

    const handleChange = (event) => {
        setNewTodo(event.target.value);
    }

    const handleNewTodoKeyDown = (event) => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        const val = newTodo.trim();

        if (val) {
            console.log('addTodo: ', props.model)
            props.model.addTodo(val);
            setNewTodo('');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const val = newTodo.trim();

        if (val) {
            console.log('addTodo: ', props.model)
            props.model.addTodo(val);
            setNewTodo('');
        }
    }

    const toggleAll = (event) => {
        const checked = event.target.checked;
        props.model.toggleAll(checked);
    }

    const toggle = (todoToToggle) => {
        props.model.toggle(todoToToggle);
    }

    const destroy = (todo) => {
        props.model.destroy(todo);
    }

    const edit = (todo) => {
        setEditing(todo.id);
    }

    const save = (todoToSave, text) => {
        props.model.save(todoToSave, text);
        setEditing(null);
    }

    const cancel = () => {
        setEditing(null);
    }

    const shownTodos = todos?.filter(todo => {
        switch (nowShowing) {
            case ACTIVE_TODOS:
                return !todo.completed;
            case COMPLETED_TODOS:
                return todo.completed;
            default:
                return true;
        }
    });

    const todoItems = shownTodos?.map(function (todo) {
        return (
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggle(todo)}
                onDestroy={() => destroy(todo)}
                onEdit={() => edit(todo)}
                editing={editing === todo.id}
                onSave={() => save(todo)}
                onCancel={cancel}
            />
        );
    }, this);


    const activeTodoCount = todos?.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1;
    }, 0);

    return (
        <div className="wrapper">
            <header className="header">
                <h1>You have {activeTodoCount} Todos</h1>
                
            </header>
            {todos && todos.length > 0 && (
                <section className="main">
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </section>
            )}
            <div className="footer">
                <input
                    className="new-todo"
                    placeholder="Enter Item"
                    value={newTodo}
                    onKeyDown={handleNewTodoKeyDown}
                    onChange={handleChange}
                    autoFocus={true}
                />
                <button className="btn-submit" onClick={handleSubmit}>Submit</button>
            </div>
            
        </div>
    )
}

export default TodoList;