import { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import Board from './Board';
import DestinationDialog from './DestinationDialog';
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import Card from './Card';
import { arrayMove } from '@dnd-kit/sortable';
import { act } from 'react';
import initialDestinations from './data/destiantion';
import Statistics from './Statistics'
import { getWeather } from './services/weather';
import { getCoordinates } from "./services/weather";


function App() {

const columns = ["Dreaming", "Planning", "Booked", "Visited"];

const columnsLabelImage = {
  Dreaming: "💭",
  Planning: "📝",
  Booked: "✈️",
  Visited: "🌏"
}

const [destinations, setDestinations] = useState(() => {
  const savedDestinations = localStorage.getItem("destinations")
  console.log(savedDestinations)
  if (savedDestinations) {
    return JSON.parse(savedDestinations);
  }

  return initialDestinations;
}
);

useEffect(() => {
  localStorage.setItem(
    "destinations",
    JSON.stringify(destinations)
  );
}, [destinations]);

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
  const [search, setSearch] = useState("");
  const [showFavoriteOnly, setShowFavoriteOnly] = useState(false);
  const [weather, setWeather] = useState(null);

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
    setWeather(null);
  }

  function toggleShowFavorite() {
    setShowFavoriteOnly((prev) => !prev)
  }

 async function openDestination(destination) {
  const data = await getWeather(
    destination.lat, 
    destination.lon,
  );

  setWeather(data);
  console.log(weather)
      setSelectedDestination(destination);
      openDialog();
  }

async function handleSaveDestination(destination) {
  const destinationToSave = {
    ...destination,
    date: destination.date?.format("YYYY-MM-DD"),
   
  };

  if (selectedDestination) {
    setDestinations((prev) => 
      prev.map((item) => {
        if (item.id === destination.id) {
        return destinationToSave;
        }
      return item;
      })
    );
    } else {
      const coordinates = await getCoordinates(
        destination.city,
        destination.country
      );
      console.log(coordinates);
       const newDestination = {
      ...destinationToSave,
      id: crypto.randomUUID(),
      date: destination.date?.format("YYYY-MM-DD"),
      lat: coordinates.lat,
      lon: coordinates.lon
    };
    setDestinations((prev) => [...prev, newDestination]);
  }
}

function changeFavorite(destination) {
    const destinationToSave = {
    ...destination,
    favorite: !destination.favorite
  };
  setDestinations((prev) => 
    prev.map((item) => {
      if (item.id === destination.id) {
        return destinationToSave
      }
      return item;
    }))
}

function handleDeleteDestination(id) {

  setDestinations((prev) => {
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
    setDestinations((prev) => 
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
    setDestinations(withoutActive);

  }
   setDraggedDestination(null);
    return;
  }
   /* sorted in the same column */
  if (overDestination.status === draggedDestination.status) {
      setDestinations((prev) => arrayMove(prev, oldIndex, newIndex));

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
    setDestinations(withoutActive);
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
       search={search}
       setSearch={setSearch}
       showFavoriteOnly={showFavoriteOnly}
       setShowFavoriteOnly={setShowFavoriteOnly}
       toggleShowFavorite={toggleShowFavorite}
      />
      <DestinationDialog
        closeDialog={closeDialog}
        open={open}
        onSave={handleSaveDestination}
        selectedDestination={selectedDestination}
        destinations={destinations}
        onDelete={handleDeleteDestination}
        weather={weather}
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
            search={search}
            setSearch={setSearch}
            showFavoriteOnly={showFavoriteOnly}
            setShowFavoriteOnly={setShowFavoriteOnly}
          />
          <DragOverlay>
            {draggedDestination && <Card 
              id={draggedDestination.id}
              city={draggedDestination.city}
              country={draggedDestination.country}
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
