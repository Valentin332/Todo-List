import React from 'react'
import Todo from "./components/Todo.jsx"

import { nanoid } from 'nanoid'

 export default function App() {
 const [newToDo, setNewToDo] = React.useState("")
 const [toDoList, setToDoList] = React.useState(JSON.parse(localStorage.getItem("list")) || "")
 const [editing, setEditing] = React.useState(false);
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
const inputField = document.querySelector("#tarea");
inputField.value = toDoList.find(toDoItem => toDoItem.id === itemId).value;
setToDoList(prevList => {
  const newerList = prevList.map(toDoItem => toDoItem.id !== itemId ? {...toDoItem, checked: false} : {...toDoItem, checked:true})
  return newerList
})
inputField.focus()
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
  if(newToDo  !== ""){
const fechaDeCreacion = new Date();
const datosFechaCreacion = `${dias[fechaDeCreacion.getDay() - 1 ]} ${fechaDeCreacion.getDate()}/${fechaDeCreacion.getMonth() + 1}/${fechaDeCreacion.getFullYear()} `
const datosFechaExp = document.querySelector("#fechaExp");
const datosHoraExp = document.querySelector("#horaExp");
    const newItem = {
    id: nanoid(),
    value: newToDo,
    checked: false,
    fecha: datosFechaCreacion,
    fechaDeExpiracion: datosFechaExp.value,
    horaDeExpiracion: datosHoraExp.value,
    };
  if(!toDoList){
    setToDoList([newItem])
    } else {
      setToDoList((prevList) => [...prevList, newItem])
    }
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
    fechaDeExpiracion = {todo.fechaDeExpiracion}
    horaDeExpiracion = {todo.horaDeExpiracion}
    />
    )
}) : "";

 return (
  <div className='main container'>
  <h1 className="main--header">TO DO LIST</h1>
    <form className='main--form mb-3 border border-3 border-dark  rounded-5 p-3'>
    <div className="form-floating">
    <input className='form-control form-control-sm border-primary border-opacity-50' onFocus={update}  onChange={update} type="text" id="tarea" placeholder='Add Task'/>
    <label className='form-label' htmlFor="#tarea">Añadir nueva tarea</label>
    </div>
    <label htmlFor="#fechaExp">Fecha de Expiración (Opcional)</label>
    <input className='form-control form-control-sm border-primary border-opacity-50 '   type="date"  name="fechaDeExpiracion" id="fechaExp" /> 
    <input className='form-control form-control-sm border-primary border-opacity-50 mt-2'   type="time" name="horaDeExp" id="horaExp"/>
    <br/>
    <button className='mb-2 btn btn-primary'  onClick={ editing ? handleEdit : handleAdd}>{editing ? "Confirmar" : "Añadir"}</button>
</form>

   {todoRender}
  
  </div>
)
  
}
