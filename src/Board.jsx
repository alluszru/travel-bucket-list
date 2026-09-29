import Column from "./Column"

function Board(props) {


return (
    <div className="board">
      {props.columns.map((column) => {
        const cardsForColumn = props.destinations
        .filter((destination) => destination.status === column)
        .filter((destination) => {
          const search = props.search.toLowerCase();

          return (
            destination.city.toLowerCase().includes(search) ||
            destination.country.toLowerCase().includes(search) ||
            destination.priority.toLowerCase().includes(search) ||
            destination.status.toLowerCase().includes(search)
          );
        }) 
          .filter((destination) => {
              if (!props.showFavoriteOnly) {
                return true;
              }

              return destination.favorite;
            });
      
          
                
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