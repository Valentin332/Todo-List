import React from 'react'
import Todo from "./components/Todo.jsx"

import { nanoid } from 'nanoid'

 export default function App() {
 const [newToDo, setNewToDo] = React.useState("")
 const [toDoList, setToDoList] = React.useState(JSON.parse(localStorage.getItem("list")) || "")
 const [editing, setEditing] = React.useState(false)
 const dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
 React.useEffect(() => {
 const toDoListJson = JSON.stringify(toDoList);
 toDoListJson && localStorage.setItem("list", toDoListJson)
},[toDoList]);

function deleteItem(event, itemId){
  event.stopPropagation();
  setToDoList( prevList => {
     const newList = prevList.filter(toDoItem => toDoItem.id !== itemId);
     return newList
  })
}

function update(event){
  setNewToDo(event.target.value)
};

function editItem(event, itemId){
setEditing(true);
const inputField = document.querySelector("#todo--input");
inputField.value = toDoList.find(toDoItem => toDoItem.id === itemId).value;
setToDoList(prevList => {
  const newerList = prevList.map(toDoItem => toDoItem.id !== itemId ? {...toDoItem, checked: false} : {...toDoItem, checked:true})
  return newerList
})
}

function handleEdit(){
 setToDoList(prevList => {
   const newList = prevList.map(item => item.checked ? {...item, value : newToDo, checked : false} : item);
   return newList
 })

 setEditing(false)
document.getElementById("todo--input").value = ""
}

function handleAdd(){
  if(newToDo !== ""){
const fecha = new Date();
const fechaDatos = `${dias[fecha.getDay() - 1 ]} ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} `

    const newItem = {
    id: nanoid(),
    value: newToDo,
    checked: false,
    fecha: fechaDatos
    };
  if(!toDoList){
    setToDoList([newItem])
    } else {
      setToDoList((prevList) => [...prevList, newItem])
    }
    //cleanup
    document.getElementById("todo--input").value = ""
  }
}

const todoRender = toDoList ? toDoList.map((todo, index) => {
  return (
  <Todo 
    id = {todo.id}
    key= {index} 
    val = {todo.value}
    deleteFunc = { (event) => deleteItem(event,todo.id)}
    editFunc = { (event) => editItem(event, todo.id)}
    fechaDeCreacion = {todo.fecha}
    />
    )
}) : "";

 return (
  <div className='main container'>
  <h1 className="main--header">TO DO LIST</h1>
    <form className='main--form mb-3'>
    <div className="form-floating">
    <input className='form-control form-control-sm'   onChange={update}type="text" id="todo--input" placeholder='Add Task' ></input>
    <label className='form-label' htmlFor="#todo--input">Add new task</label>
    </div>
    <button className='mt-1'  onClick={ editing ? handleEdit : handleAdd}>{editing ? "Submit" : "Add"}</button>
</form>

   {todoRender}
  
  </div>
)
  
}
