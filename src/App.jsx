import { useState } from 'react';
import NavigationBar from './NavigationBar';
import Board from './Board';
import DestinationDialog from './DestinationDialog';

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



  return (
    <div className="app">
      
      <NavigationBar 
       open={open}
       openDialog={openDialog}
      />

      <DestinationDialog 
        closeDialog={closeDialog}
        open={open}
        onSave={handleSaveDestination}
        selectedDestination={selectedDestination}
        destinations={destinations}
      />
    
      <main>
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
      </main>

    </div>
  );
};

export default App;
