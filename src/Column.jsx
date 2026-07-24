import Card from "./Card";
import AddButton from "./AddButton";
import { useDroppable } from "@dnd-kit/core";
import {SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";


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
                <SortableContext  items={props.cards.map((card) => card.id)}
                     strategy={verticalListSortingStrategy} >
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
                </SortableContext>
              
                    <AddButton open={props.open}
            openDialog={props.openDialog}></AddButton>
                

            </div>
        </>
    );
};

export default Column; 