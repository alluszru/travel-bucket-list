import { useState } from 'react';
import NavigationBar from './NavigationBar';
import Board from './Board';
import AddDestinationDialog from './AddDestinationDialog';

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
  priority: "low",
  status: "Visited",
  date: "May 2027"
  },
  {
  id: crypto.randomUUID(),
  place: "Oman",
  priority: "high",
  status: "Dreaming",
  date: "May 2027"
  },
   {
  id: crypto.randomUUID(),
  place: "Spain",
  priority: "medium",
  status: "Planning",
  date: "May 2027"
  },
  {
  id: crypto.randomUUID(),
  place: "Spain",
  priority: "medium",
  status: "Planning",
  date: "May 2027"
  },
     {
  id: crypto.randomUUID(),
  place: "Spain",
  priority: "medium",
  status: "Planning",
  date: "May 2027"
  },
     {
  id: crypto.randomUUID(),
  place: "Spain",
  priority: "medium",
  status: "Visited",
  date: "May 2027"
  },
  {id: crypto.randomUUID(),
  place: "Spain",
  priority: "medium",
  status: "Planning",
  date: "May 2027"
  },
     {
  id: crypto.randomUUID(),
  place: "Spain",
  priority: "medium",
  status: "Planning",
  date: "May 2027"
  }]
);

const priorityColor = {
  low: "#EAF7EF",
  medium: "#FFF8E8",
  high: "#FCEBEC"
};

const priorityTextColor = {
   low: "#4A7C59",
  medium: "#9B7B18",
  high: "#B04A5A"
}




  return (
    <div className="app">
      
      <NavigationBar/>
      
      <main>
        <Board 
          destinations={destinations}
          columns={columns}
          priorityColor={priorityColor}
          priorityTextColor={priorityTextColor}
          columnsLabelImage={columnsLabelImage}
        />
      </main>

    </div>
  );
};

export default App;
