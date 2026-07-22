import Card from "./Card"
import Column from "./Column"

function Board(props) {


return (
    <div className="board">
      {props.columns.map((column) => {
        const cardsForColumn = props.destinations.filter(
          (destination) => destination.status === column
        );

        return (
          <Column
            key={column}
            name={column}
            cards={cardsForColumn}
            priorityColor={props.priorityColor}
            priorityTextColor={props.priorityTextColor}
            columnsLabelImage={props.columnsLabelImage}
            open={props.open}
            openDialog={props.openDialog}
            onOpenDestination={props.onOpenDestination}
            changeFavorite={props.changeFavorite}
    
          />
        );
      })}
    </div>
  );
}

export default Board;