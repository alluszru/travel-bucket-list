import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import IconButton from '@mui/material/IconButton';
import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { CSS } from "@dnd-kit/utilities";

function Card(props) {

    const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef, transition } = 
    useSortable({
        id: props.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    }
    
    console.log(transform)


    return (
        <div ref={setNodeRef} style={style} className="card" onClick={props.onClick} >
            <div className="cardHeader">
                <h3 className="cardLabel">{props.place}</h3>
                <IconButton ref={setActivatorNodeRef} {...listeners} {...attributes}>
                <DragIndicatorOutlinedIcon className="cardDragIndicator"  />
                </IconButton>
           </div>
                <p className="cardDate">{props.date}</p>

            <div className="cardFooter">
                <div className="cardPriority" >
                    <p className="priorityBadge" 
                    style={{color: props.priorityTextColor[props.priority], backgroundColor: props.priorityColor[props.priority] }}>★ {props.priority}</p>
                </div>

                <div className="cardFavorite">
                    <IconButton  onClick={(event) => {event.stopPropagation(); 
                        props.changeFavorite()}}>
                    {props.favorite ?<StarOutlinedIcon/> : <StarBorderPurple500OutlinedIcon/>}
                    </IconButton>
                </div>
            </div>
        </div>
    )
 

}

export default Card;