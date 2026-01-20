import { useLocalstorage } from './hooks/useLocalstorage';

import './App.css';
import { ITEM_TYPES } from './const';
import ToDoForm from './components/ToDoForm';
import ProgressBar from './components/ProgressBar';
import { ResetButton } from './components/ResetButton';

const initialToDoItems = {
  level1item1: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
  level1item2: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
  level1MiniBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
  level2item1: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
  level2item2: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
  level2MiniBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
  toDoBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.BOSS },
};

const TO_DO_ITEMS_KEY = 'toDoItems';
function App() {
  const [toDoItems, setToDoItems] = useLocalstorage(TO_DO_ITEMS_KEY, { ...initialToDoItems });

  function resetToDoItems() {
    setToDoItems({ ...initialToDoItems });
  }

  return (
    <div className="App container">
      <ToDoForm toDoItems={toDoItems} setToDoItems={setToDoItems} />
      <ResetButton resetToDoItems={resetToDoItems} />
      <ProgressBar toDoItems={toDoItems} />
    </div>
  );
}

export default App;
