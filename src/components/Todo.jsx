import { useState } from "react";

const Todo = () => {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: new Date().getTime(),
        text: input,
        time: new Date().toLocaleTimeString(),
      };
      setTask([...task, newTask]);
      setInput("");
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = task.filter((tasks) => tasks.id !== id);
    setTask(updatedTasks);
  };

  const editTask = (id, text) => {
    setEdit(true);
    setEditId(id);
    setEditValue(text);
  };

  const updateTask = (id) => {
    const updatedTasks = task.map((tasks) =>
      tasks.id === id
        ? {
            ...tasks,
            text: editValue,
            updateTime: new Date().toLocaleTimeString(),
          }
        : tasks
    );
    setTask(updatedTasks);
    setEdit(false);
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className=" min-h-screen font-sans">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">TODO LIST</h1>
        <div className="flex mb-4">
          <input
            className="flex-grow border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
          />
          <button
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {task.map((tasks) => (
            <li
              key={tasks.id}
              className=" shadow-md rounded-md px-4 py-2 flex items-center justify-between"
            >
              {edit && editId === tasks.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-grow border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
                  />
                  <button
                    onClick={() => updateTask(tasks.id)}
                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <span className="p-2">{tasks.text}</span>
                  <small className="text-gray-500 block p-2 rounded m-3 border">
                    {tasks.updateTime
                      ? `Updated on : ${tasks.updateTime}`
                      : `Added on : ${tasks.time}`}
                  </small>
                  <div>
                    <button
                      onClick={() => deleteTask(tasks.id)}
                      className="mr-2 text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editTask(tasks.id, tasks.text)}
                      className="text-green-500 hover:text-blue-600"
                    >
                      Update
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
