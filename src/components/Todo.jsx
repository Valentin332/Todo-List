import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faXmarkSquare, faCheckSquare} from "@fortawesome/free-solid-svg-icons"
export default function Todo(props){
  const dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
  const diaDeExp = dias[new Date(props.fechaDeExpiracion.replace(/-/g, '\/')).getDay() - 1];

  function reordenarFecha(){
const reordenado = props.fechaDeExpiracion.split("-");
reordenado.unshift(reordenado.pop());
const añoReordenado = reordenado.slice(1,2)
 reordenado.splice(1,1);
 reordenado.push(añoReordenado[0])
 return reordenado.join("-").replace(/-/g, '\/')
  }

function isItExpired(){
  if(props.fechaDeExpiracion){
 const fechaExp = new Date(props.fechaDeExpiracion.replace(/-/g, '\/')).getTime();
  const horaExp = props.horaDeExpiracion ? props.horaDeExpiracion.split(":")[0] * 3600000 + props.horaDeExpiracion.split(":")[1] * 60000 : 0;
 const tiempoRestante = horaExp + fechaExp;
 if((tiempoRestante - new Date().getTime()) > 0){ return false}
 else{return true}
}
}


return (
<div  className="todo--item mb-2 border border-4 border-dark rounded-top p-1">
<h3>{props.val}</h3>
<p>Fecha de creación: {props.fechaDeCreacion} </p>

{props.fechaDeExpiracion && <p>Fecha de expiración : {diaDeExp} {reordenarFecha()} {props.horaDeExpiracion && `a las ${props.horaDeExpiracion}`}</p>}
{props.fechaDeExpiracion && <p>Estado : {isItExpired() ? <span className="red">Expirado</span> : <span>Pendiente</span>}</p>}
<FontAwesomeIcon className="btn btn-danger btn-lg me-5 mb-1" onClick={props.deleteFunc} icon= {faXmarkSquare} />
<FontAwesomeIcon className="btn btn-success btn-lg me-5 mb-1" onClick={props.deleteFunc} icon= {faCheckSquare} />
<button type="button" onClick={props.editFunc} className="btn btn-primary btn mb-1">Editar</button>
</div>

)
}

