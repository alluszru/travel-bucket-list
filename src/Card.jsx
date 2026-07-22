import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import IconButton from '@mui/material/IconButton';

function Card(props) {

    return (
        <div className="card" onClick={props.onClick}>
            <h3 className="cardLabel">{props.place}</h3>
            <p className="cardDate">{props.date}</p>
            <div className="cardPriority" >
                <p className="priorityBadge" 
                style={{color: props.priorityTextColor[props.priority], backgroundColor: props.priorityColor[props.priority] }}>★ {props.priority}</p>
            </div>
            <div>
                <IconButton onClick={(event) => {event.stopPropagation(); 
                    props.changeFavorite()}}>
                {props.favorite ?<StarOutlinedIcon/> : <StarBorderPurple500OutlinedIcon/>}
                </IconButton>
            </div>
            
        </div>
    )
 

}

export default Card;