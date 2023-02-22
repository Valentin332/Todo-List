import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faXmarkSquare, faCheckSquare} from "@fortawesome/free-solid-svg-icons"
export default function Todo(props){

return (
<div  className="todo--item mb-2">
<h3>{props.val}</h3>
<p>Fecha de creación : {props.fechaDeCreacion}</p>

{props.fechaDeExpiracion && <p>Fecha de expiración : {props.fechaDeExpiracion} {props.horaDeExpiracion && `a las ${props.horaDeExpiracion}`}</p>}
{props.fechaDeExpiracion && <p>Estado : Pendiente</p>}
<FontAwesomeIcon className="btn btn-danger btn-lg" onClick={props.deleteFunc} icon= {faXmarkSquare} />
<FontAwesomeIcon className="btn btn-success btn-lg" onClick={props.deleteFunc} icon= {faCheckSquare} />
<button type="button" onClick={props.editFunc} className="btn btn-primary btn">Edit</button>
</div>

)
}

