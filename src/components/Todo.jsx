import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faXmarkSquare, faCheckSquare} from "@fortawesome/free-solid-svg-icons"
export default function Todo(props){

return (
<div  className="todo--item">
<h3>{props.val}</h3>
<p>Fecha de creación : {props.fechaDeCreacion}</p>
<FontAwesomeIcon className="button button-delete" onClick={props.deleteFunc} icon= {faXmarkSquare} />
<FontAwesomeIcon className="button button-checked" onClick={props.deleteFunc} icon= {faCheckSquare} />
<button type="button" onClick={props.editFunc} className="button button-edit">Edit</button>
</div>

)
}

