import { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import Board from './Board';
import DestinationDialog from './DestinationDialog';
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import Card from './Card';
import { arrayMove } from '@dnd-kit/sortable';
import { act } from 'react';

function App() {

const columns = ["Dreaming", "Planning", "Booked", "Visited"];

const columnsLabelImage = {
  Dreaming: "💭",
  Planning: "📝",
  Booked: "✈️",
  Visited: "🌏"
}

const [destinations, setDestinantions] = useState([ 
  {
  id: crypto.randomUUID(),
  place: "London",
  priority: "Low",
  status: "Visited",
  date: "May 2027",
  favorite: false
  },
  {
  id: crypto.randomUUID(),
  place: "Oman",
  priority: "High",
  status: "Dreaming",
  date: "May 2027",
  favorite: false
  },
   {
  id: crypto.randomUUID(),
  place: "Spain",
  priority: "Medium",
  status: "Planning",
  date: "May 2027",
  favorite: false
  },
  {
  id: crypto.randomUUID(),
  place: "Spain",
  priority: "Medium",
  status: "Planning",
  date: "May 2027",
  favorite: false
  },
     {
  id: crypto.randomUUID(),
  place: "Spain",
  priority: "Medium",
  status: "Planning",
  date: "May 2027",
  favorite: false
  },
     {
  id: crypto.randomUUID(),
  place: "Spain",
  priority: "Medium",
  status: "Visited",
  date: "May 2027",
  favorite: false
  },
  {id: crypto.randomUUID(),
  place: "Spain",
  priority: "Medium",
  status: "Planning",
  date: "May 2027",
  favorite: false
  },
     {
  id: crypto.randomUUID(),
  place: "Spain",
  priority: "Medium",
  status: "Planning",
  date: "May 2027",
  favorite: false
  }]
);

const priorityColor = {
  Low: "#EAF7EF",
  Medium: "#FFF8E8",
  High: "#FCEBEC"
};

const priorityTextColor = {
  Low: "#4A7C59",
  Medium: "#9B7B18",
  High: "#B04A5A"
}
  const [open, setOpen] = useState(false);

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [draggedDestination, setDraggedDestination] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev)
  }

  useEffect(() => {
  document.body.classList.toggle("dark", isDarkMode);
}, [isDarkMode]);
  

 function openDialog() {
  setOpen(true);
 }

  function closeDialog() {
    setOpen(false);

  }

  function openDestination(destination) {
  
      setSelectedDestination(destination);
      openDialog();
  }

function handleSaveDestination(destination) {
  const destinationToSave = {
    ...destination,
    date: destination.date?.format("YYYY-MM-DD"),
  };

  if (selectedDestination) {
    setDestinantions((prev) => 
      prev.map((item) => {
        if (item.id === destination.id) {
        return destinationToSave;
        }
      return item;
      })
    );
    } else {
       const newDestination = {
      ...destinationToSave,
      id: crypto.randomUUID(),
      date: destination.date?.format("YYYY-MM-DD")
    };
    setDestinantions((prev) => [...prev, newDestination]);
  }
}

function changeFavorite(destination) {
    const destinationToSave = {
    ...destination,
    favorite: !destination.favorite
  };
  setDestinantions((prev) => 
    prev.map((item) => {
      if (item.id === destination.id) {
        return destinationToSave
      }
      return item;
    }))
}

function handleDeleteDestination(id) {

  setDestinantions((prev) => {
    return prev.filter((destiantion) => id !== destiantion.id
       );
      });

  setSelectedDestination(null);
}

function onDragStart(event) {
  const destination = destinations.find(
    (destination) => destination.id === event.active.id)
    console.log(destination)

    setDraggedDestination(destination);
}


function onDragEnd (event) {

  const {active, over} = event;

   if (!event.over) {
    setDraggedDestination(null);
    return
   }

   
  const oldIndex = destinations.findIndex(
    (d) => d.id === active.id
  );

  const newIndex = destinations.findIndex(
    (d) => d.id === over.id
  );

  const overDestination = destinations.find(
  (d) => d.id === over.id
  );

  const activeDestination = destinations.find(
    (d) => d.id === active.id
  );

   const withoutActive = destinations.filter(
        d => d.id !== active.id 
      ); 


    
  /* for empty columns */
  if(!overDestination) {
    const cardsInColumn = withoutActive.filter(
    d => d.status === over.id
);
   if (cardsInColumn.length === 0) {
    setDestinantions((prev) => 
     prev.map(item => 
      item.id === active.id ? {...item, status: over.id} : item
      )
    );
  } else { 
    const lastCard = cardsInColumn[cardsInColumn.length - 1];
    const lastIndex = withoutActive.findIndex(d => d.id === lastCard.id);

    const updatedDestination = {
    ...activeDestination,
     status: over.id,
      };

        withoutActive.splice(lastIndex+1, 0, updatedDestination);
    setDestinantions(withoutActive);

  }
   setDraggedDestination(null);
    return;
  }
   /* sorted in the same column */
  if (overDestination.status === draggedDestination.status) {
      setDestinantions((prev) => arrayMove(prev, oldIndex, newIndex));

  /* sorted in not empty column */
    } else {
    
   const updatedDestination = {
        ...activeDestination,
        status: overDestination.status
      }
    
        const insertIndex = withoutActive.findIndex(
        d => d.id === over.id
      );
      

    withoutActive.splice(insertIndex, 0, updatedDestination);
    setDestinantions(withoutActive);
  }

  setDraggedDestination(null);
  }

  
 
  

  return (
    <div className={`app ${isDarkMode ? "dark" : " "}`}>
      <NavigationBar 
       open={open}
       openDialog={openDialog}
       isDarkMode={isDarkMode}
       toggleDarkMode={toggleDarkMode}
      />
      <DestinationDialog
        closeDialog={closeDialog}
        open={open}
        onSave={handleSaveDestination}
        selectedDestination={selectedDestination}
        destinations={destinations}
        onDelete={handleDeleteDestination}
      />
      <main>
        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} collisionDetection={pointerWithin}>
          <Board 
            destinations={destinations}
            columns={columns}
            priorityColor={priorityColor}
            priorityTextColor={priorityTextColor}
            columnsLabelImage={columnsLabelImage}
            open={open}
            openDialog={openDialog}
            onOpenDestination={openDestination}
            changeFavorite={changeFavorite}
          />
          <DragOverlay>
            {draggedDestination && <Card 
              id={draggedDestination.id}
              place={draggedDestination.place}
              priority={draggedDestination.priority}
              date={draggedDestination.date}
              favorite={draggedDestination.favorite}
              priorityColor={priorityColor}
              priorityTextColor={priorityTextColor}/>}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
};

export default App;
