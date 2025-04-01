import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  


  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS(newTodos)
  }

  const handleDelete = (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS(newTodos)
  }

  const handleAdd = ()=>{
    const newTodos = [...todos, {id: uuidv4(), todo, isCompleted: false}];
    setTodos(newTodos)
    setTodo("") 
    saveToLS(newTodos)
  }
  
  const handleChange = (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }
  

  return (
    <>
    <Navbar/> 
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
       <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-8">
        <h1 className='font-bold text-center text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>TaskManager</h1>
        <p className="text-center text-gray-600">Organize your day, achieve your goals</p>
         <div className="space-y-6">
          <div className="space-y-4">
            <h2 className='text-2xl font-bold text-gray-800'>Create New Task</h2>
            <div className="flex gap-2">
              <input 
                onChange={handleChange} 
                value={todo} 
                type="text" 
                placeholder="What needs to be done?"
                className='w-full rounded-lg px-4 py-2 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none' 
              />
              <button 
                onClick={handleAdd} 
                disabled={todo.length<=3} 
                className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg px-6 py-2 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg'
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input 
              className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500' 
              id='show' 
              onChange={toggleFinished} 
              type="checkbox" 
              checked={showFinished} 
            /> 
            <label className='text-gray-700' htmlFor="show">Show Completed Tasks</label> 
          </div>

          <div className='h-px bg-gray-200 w-full'></div>

          <div className="space-y-6">
            <h2 className='text-2xl font-bold text-gray-800'>Your Tasks</h2>
            <div className="space-y-4">
              {todos.length === 0 && 
                <div className='text-center py-8 text-gray-500'>No tasks yet. Add one to get started!</div>
              }
              {todos.map(item => {
                return (showFinished || !item.isCompleted) && (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <div className='flex items-center gap-4'> 
                      <input 
                        name={item.id} 
                        onChange={handleCheckbox} 
                        type="checkbox" 
                        checked={item.isCompleted}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" 
                      />
                      <div className={item.isCompleted ? "line-through text-gray-500" : "text-gray-800"}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e)=>handleEdit(e, item.id)} 
                        className='text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all'
                      >
                        <FaEdit size={18} />
                      </button>
                      <button 
                        onClick={(e)=>{handleDelete(e, item.id)}} 
                        className='text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all'
                      >
                        <AiFillDelete size={18} />
                      </button>
                    </div> 
                  </div>
                )
              })}
            </div>
          </div>
        </div>
       </div>
    </div>
    </>
  )
}

export default App