import Card from "./Card";
import AddButton from "./AddButton";
import { useDroppable } from "@dnd-kit/core";

function Column(props) {


const {
    setNodeRef, 
    isOver,
} = useDroppable({
    id: props.name
})
    return (
        <>
            <div className={`column ${isOver ? "column-active" : ""}`} ref={setNodeRef}>
                <div className="columnLabel"> 
                   {props.columnsLabelImage[props.name]} {props.name}
                   
                </div>
                <div className="cardsSpace"> 
                    {props.cards.map((card) => {
                    return (
                    <Card 
                     key={card.id}
                     id ={card.id}
                     place = {card.place}
                     priority={card.priority}
                     date={card.date}
                     favorite={card.favorite}
                     priorityColor={props.priorityColor}
                    priorityTextColor={props.priorityTextColor}
                    openDialog={props.openDialog}
                    onClick={() => props.onOpenDestination(card)}
                    changeFavorite = {() => props.changeFavorite(card)}
    

                     />)
                    })}
                </div>
                <div>
                    <AddButton open={props.open}
            openDialog={props.openDialog}></AddButton>
                </div>

            </div>
        </>
    );
};

export default Column; 