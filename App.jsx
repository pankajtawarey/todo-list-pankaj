import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const[showfinished,setshowfinished]=useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  const togglefinished=(e)=>{

    setshowfinished(!showfinished)

  }

  const saveTols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    });

    settodos(newtodos)

    saveTols()


  }
  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    });

    settodos(newtodos)

    saveTols()


  }
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveTols()
  }
  const handlechange = (e) => {
    settodo(e.target.value)

  }
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    console.log(index)
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].isCompleted;
    settodos(newtodos)

    saveTols()
  }



  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
      <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5">
          <h1 className='text-lg font-bold'>Add a Todo</h1>
          <input onChange={handlechange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6 disabled:bg-violet-700'>Save</button>
        </div>
        <input onChange={togglefinished} type='checkbox' checked={showfinished}/>Show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>to todos to display</div>}
          {todos.map(item => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/4 justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handlecheckbox} type="checkbox" value={todo.isCompleted} id="" />
                <div className={item.isComplted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2'>Delete</button>
              </div>

            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
