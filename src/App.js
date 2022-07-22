import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import Model from './api/TodoModel';

const model = new Model('todolist');

function App() {
  console.log('subscribe: ', model.todos)
  return (
    <div className="App">
      <TodoList model={model} />
    </div>
  );
}

export default App;
