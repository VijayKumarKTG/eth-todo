import { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';

function App() {
  const [todoList, setTodoList] = useState({
    account: '',
    taskCount: 0,
    tasks: [],
    loading: false,
  });
  const [contract, setContract] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadBlockchainData();
    return () => {
      //cleanup
    };
  }, []);

  const loadBlockchainData = async () => {
    setTodoList((prevState) => ({ ...prevState, loading: true }));
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
    const accounts = await web3.eth.getAccounts();
    const newContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    const taskCount = await updateTaskCount(newContract);
    const tasks = await updateTasksList(newContract, taskCount);
    setTodoList({
      account: accounts[0],
      taskCount: taskCount,
      tasks: [...tasks],
      loading: false,
    });
    setContract(newContract);
  };

  const updateTaskCount = async (todoList) => {
    const taskCount = await todoList.methods.taskCount().call();
    return taskCount;
  };

  const updateTasksList = async (
    currentContract = contract,
    taskCount = todoList.taskCount
  ) => {
    let tasksArr = [];
    for (let i = 1; i <= taskCount; i++) {
      const task = await currentContract.methods.tasks(i).call();
      tasksArr.push(task);
    }
    return tasksArr;
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onAddTask = async (e) => {
    e.preventDefault();
    try {
      setTodoList((prevState) => ({ ...prevState, loading: true }));
      const receipt = await contract.methods
        .createTask(input)
        .send({ from: todoList.account });
      if (receipt) {
        const taskCount = await updateTaskCount(contract);
        const tasks = await updateTasksList(contract, taskCount);
        setTodoList((prevState) => ({
          ...prevState,
          taskCount: taskCount,
          tasks: tasks,
          loading: false,
        }));
        setInput('');
      }
    } catch (err) {
      setTodoList((prevState) => ({ ...prevState, loading: false }));
      setInput('');
      console.log(err.message);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const receipt = await contract.methods
        .toggleCompleted(id)
        .send({ from: todoList.account });
      if (receipt) {
        const tasks = await updateTasksList(contract, todoList.taskCount);
        setTodoList((prevState) => ({
          ...prevState,
          tasks: tasks,
        }));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='container'>
      <h1>Hello World</h1>
      <p>Your account: {todoList.account}</p>
      <form>
        <input type='text' value={input} onChange={(e) => onChangeHandler(e)} />
        <button type='submit' onClick={(e) => onAddTask(e)}>
          Add
        </button>
      </form>
      {todoList.loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Task count: {todoList.taskCount}</p>
          <ul>
            {todoList.tasks.map((task) => (
              <li
                key={task.id}
                onClick={() => toggleCompleted(task.id)}
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  width: 'max-content',
                }}>
                {task.content}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
