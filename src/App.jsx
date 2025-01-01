import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css'

function App() {
  const [list, setList] = useState([])
  const [task, setTask] = useState('')
  const [complete, setComplete] = useState([])
  const [allTaskList, setAllTaskList] = useState(true)
  const [completedTaskList, setCompletedTaskList] = useState(false)

  // Add task
  function addTask(){ 
    if(task.trim()){
      setList([...list,{text : task, completed : false}])
      setTask('')
    }
  }

  //copmleted task in list
  function completed(index){
    const updatedTask = list.map((t, i)=>{
      return i === index ? {...t, completed: !t.completed} : t
    })
    setList(updatedTask)
    const completedTask = list.filter((t)=> t.completed)
    setComplete(completedTask)
    
  }
  //Delete task
  function deleteTask(index){  
    setList(list.filter((_, i)=> i !== index))
  }
  return (
    <>
    <div className='bg-white max-w-lg mx-auto mt-36 py-4 px-4 rounded-md'>
      <h1 className='text-2xl text-center mb-4'>ToDo App</h1>
      <div className='flex  '>
        <input 
          type="text"
          value={task}
          onChange={(e)=>{setTask(e.target.value)}}
          className='w-full border-2 rounded-md border-gray-500 px-2 focus:outline-green-400'
          placeholder='Add a new task'
        />
        <button 
          className='bg-green-500 py-2 px-4 ml-3 rounded-md text-white hover:bg-green-600'
          onClick={addTask}
        >Add</button>
      </div>
      <div className={` border-b-2 border-gray-300 mt-4 py-3 px-2`}>
        <button 
          onClick={()=>{
            setCompletedTaskList(prev => false)
            setAllTaskList(prev => true)
          }}
          className={`${allTaskList? 'bg-blue-300' : 'bg-transparent'} py-1 px-3 border-2 border-black mr-2 rounded-md`}>All</button>
        <button className={`${completedTaskList? 'bg-blue-300' : 'bg-transparent'} py-1 px-3 border-2 border-black mr-2 rounded-md`}
          onClick={()=>{
            setCompletedTaskList(prev => true)
            setAllTaskList(prev => false)
          }}
        >Complated</button>
      </div>
     <div>
      <ul className='my-4'>
        {
        allTaskList ? 
        list.map((t, index)=>(
           <li 
              key={index}
              className={`${t.completed? 'bg-green-200' : 'bg-gray-200'} px-4 py-2 mb-2 text-xl border-b-2 border-gray-600 rounded-md flex justify-between items-center`}>
                
              <p>{index + 1 }. {t.text}</p>

              <span className='flex items-center gap-x-2'>
                  <input 
                    type="checkbox" 
                    checked={t.completed}
                    onClick={()=>{completed(index)}}
                    className="w-4 h-4 bg-gray-200 border-2 border-gray-500 rounded-md  cursor-pointer" />

                  <DeleteIcon 
                    className='hover:text-red-600 cursor-pointer' 
                    onClick={()=>{
                      deleteTask(index)
                    }}
                  />
              </span>
         </li>
        )) : 
        complete.map((t, index)=>(
          <li 
             key={index}
             className={`${t.completed? 'bg-green-200' : 'bg-gray-200'} px-4 py-2 mb-2 text-xl border-b-2 border-gray-600 rounded-md flex justify-between items-center`}>
               
             <p>{index + 1 }. {t.text}</p>

             <span className='flex items-center gap-x-2'>
                 <input 
                   type="checkbox" 
                   checked={t.completed}
                   onClick={()=>{completed(index)}}
                   className="w-4 h-4 bg-gray-200 border-2 border-gray-500 rounded-md  cursor-pointer" />

                 <DeleteIcon 
                   className='hover:text-red-600 cursor-pointer' 
                   onClick={()=>{
                     deleteTask(index)
                   }}
                 />
             </span>
        </li>
       )) 
      }
        
      </ul>
     </div>
    </div>
    </>
  )
}

export default App
