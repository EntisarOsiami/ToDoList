import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function TodoList() {
  const url = 'https://68276c5e6b7628c529104d57.mockapi.io/api/task';
  const [task, setTask] = useState('');

  function AddTask(e) {
    e.preventDefault();
    if (!task) {
      toast.error('Please fill all fields');
      return;
    }
    axios.post(url, { task: task }).then((response) => {
      if (response) {
        toast.success('task added successfully');
        setTask('');
      }
    });
  }

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [task]);

  const del = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then((response) => {
        if (response) {
          toast.success('task deleted successfully');
          setTasks(tasks.filter((t) => t.id !== id));
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete task');
      });
  };

  const [searchVal, setSearchVal] = useState('');
  const [filteredTask, setFilteredTask] = useState(tasks);

  const search = () => {
    const filtered = tasks.filter((t) =>
      t.task.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredTask(filtered);
    if (filtered.length === 0 && searchVal) {
      toast.error('oops!');
    }
  };

  useEffect(() => {
    setFilteredTask(tasks);
  }, [tasks]);

  return (
    <>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='flex flex-col gap-6 mb-10'>
            <div className='max-w-md flex flex-col mb-4'>
              <div className='flex gap-3 mb-4'>
                <input
                  type='text'
                  placeholder='Search task'
                  value={searchVal}
                  className='w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <button
                  onClick={search}
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'>
                  Search
                </button>
              </div>
            </div>
            <div className='max-w-md bg-white border-2 rounded-lg shadow-lg p-6 mb-8'>
              <h1 className='text-2xl font-bold text-center mb-6 uppercase text-blue-800'>
                Add Your task
              </h1>
              <form className='space-y-4'>
                <input
                  type='text'
                  placeholder='Task'
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                  onClick={AddTask}
                  className='w-full bg-blue-500 text-white py-2 uppercase px-4 rounded-md hover:bg-blue-600 transition duration-200'>
                  Add task
                </button>
              </form>
            </div>
          </div>
          <div className='flex-1'>

            {filteredTask.length > 0 ? (
              <ul className='grid grid-cols-1 gap-6'>
                {filteredTask.map((t) => (
                  <li
                    key={t.id}
                    className='bg-white rounded-lg   border-2 shadow-lg overflow-hidden'>
                    <div className='p-6'>
                      <h3 className='text-xl font-semibold text-blue-600 mb-4'>
                        {t.task}
                      </h3>

                      <button onClick={() => { del(t.id); }} className='py-2 px-3 rounded-2xl text-white bg-red-700'>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='text-center text-gray-500 mt-8'>
                <p>oops! no task found! </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
