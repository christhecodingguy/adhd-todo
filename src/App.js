import { useState } from 'react';

import './App.css';
import { ITEM_TYPES } from './const';
import ToDoForm from './components/ToDoForm';
import ProgressBar from './components/ProgressBar';

function App() {
  const [toDoItems, setToDoItems] = useState({
    level1item1: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
    level1item2: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
    level1MiniBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
    level2item1: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
    level2item2: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
    level2MiniBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
    toDoBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.BOSS },
  });

  return (
    <div className="App container">
      <ToDoForm toDoItems={toDoItems} setToDoItems={setToDoItems} />
      <ProgressBar toDoItems={toDoItems} />
      {/* we are going to have a progress bar display here using the above state */}
    </div>
  );
}

export default App;
