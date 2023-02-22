import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faXmarkSquare, faCheckSquare} from "@fortawesome/free-solid-svg-icons"
export default function Todo(props){
console.log(props.horaDeExpiracion)
console.log(props.horaDeExpiracion.split(":")[0] * 3600000 + props.horaDeExpiracion.split(":")[1] * 60000)

function isItExpired(){
  if(props.fechaDeExpiracion){
 const fechaExp = new Date(props.fechaDeExpiracion.replace(/-/g, '\/')).getTime();
  const horaExp = props.horaDeExpiracion ? props.horaDeExpiracion.split(":")[0] * 3600000 + props.horaDeExpiracion.split(":")[1] * 60000 : 0;
 const tiempoRestante = horaExp + fechaExp;
 if((tiempoRestante - new Date().getTime()) > 0){ return "Pendiente"}
 else{return "Expirado"}
}
}



return (
<div  className="todo--item mb-2">
<h3>{props.val}</h3>
<p>Fecha de creación : {props.fechaDeCreacion}</p>

{props.fechaDeExpiracion && <p>Fecha de expiración : {props.fechaDeExpiracion.replace(/-/g, '\/')} {props.horaDeExpiracion && `a las ${props.horaDeExpiracion}`}</p>}
{props.fechaDeExpiracion && <p>Estado : {isItExpired()}</p>}
<FontAwesomeIcon className="btn btn-danger btn-lg" onClick={props.deleteFunc} icon= {faXmarkSquare} />
<FontAwesomeIcon className="btn btn-success btn-lg" onClick={props.deleteFunc} icon= {faCheckSquare} />
<button type="button" onClick={props.editFunc} className="btn btn-primary btn">Edit</button>
</div>

)
}

