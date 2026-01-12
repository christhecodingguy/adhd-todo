import { useState } from 'react';

import './App.css';
import ToDoForm from './components/ToDoForm';

function App() {
  const [toDoItems, setToDoItems] = useState({
    level1item1: { itemName: '', completed: false },
    level1item2: { itemName: '', completed: false },
    level1MiniBoss: { itemName: '', completed: false },
    level2item1: { itemName: '', completed: false },
    level2item2: { itemName: '', completed: false },
    level2MiniBoss: { itemName: '', completed: false },
    toDoBoss: { itemName: '', completed: false },
  });

  return (
    <div className="App">
      <ToDoForm toDoItems={toDoItems} setToDoItems={setToDoItems} />
      {/* we are going to have a progress bar display here using the above state */}
    </div>
  );
}

export default App;
