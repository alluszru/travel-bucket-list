import Card from "./Card";
import AddButton from "./AddButton";

function Column(props) {

    return (
        <>
            <div className="column">
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