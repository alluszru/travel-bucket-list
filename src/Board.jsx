import Card from "./Card"
import Column from "./Column"

function Board(props) {


return (
    <div className="board">
      {props.columns.map((column) => {
        const cardsForColumn = props.cards.filter(
          (card) => card.status === column
        );

        return (
          <Column
            key={column}
            name={column}
            cards={cardsForColumn}
            priorityColor={props.priorityColor}
            priorityTextColor={props.priorityTextColor}
            columnsLabelImage={props.columnsLabelImage}
          />
        );
      })}
    </div>
  );
}

export default Board;