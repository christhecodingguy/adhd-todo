import { useLocalstorage } from './hooks/useLocalstorage';

import './App.css';
import { ITEM_TYPES } from './const';
import ToDoForm from './components/ToDoForm';
import ProgressBar from './components/ProgressBar';
import { ResetButton } from './components/ResetButton';

const initialToDoItemsList = [
  {
    item1: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
    item2: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
    miniBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
  },
  {
    item1: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
    item2: { itemName: '', completed: false, itemType: ITEM_TYPES.ITEM },
    miniBoss: { itemName: '', completed: false, itemType: ITEM_TYPES.MINI_BOSS },
  },
  {
    boss: { itemName: '', completed: false, itemType: ITEM_TYPES.BOSS },
  }
];

function App() {
  const [toDoItems, setToDoItems] = useLocalstorage('toDoItems', { ...initialToDoItemsList });
  const [formDirtyState, setFormDirtyState] = useLocalstorage('formDirtyState', { isDirty: false });

  function resetToDoItems() {
    setToDoItems({ ...initialToDoItemsList });
    setFormDirtyState({ isDirty: false });
  }

  function updateTodoItems(newToDoItems) {
    setToDoItems(newToDoItems);
    setFormDirtyState({ isDirty: true });
  }

  return (
    <div className="App container">
      <ToDoForm toDoItems={toDoItems} setToDoItems={updateTodoItems} formDirtyState={formDirtyState} />
      <ResetButton resetToDoItems={resetToDoItems} />
      <ProgressBar toDoItems={toDoItems} />
    </div>
  );
}

export default App;
