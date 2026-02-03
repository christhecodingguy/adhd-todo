import { useEffect } from 'react';
import { useLocalstorage } from './hooks/useLocalstorage';

import './App.css';
import ToDoForm from './components/ToDoForm';
import ProgressBar from './components/ProgressBar';
import { ResetButton } from './components/ResetButton';
import { isToDoItemsList, getInitialToDoItemsList } from './shared/toDoItemsList';

const initialToDoItemsList = getInitialToDoItemsList();

function App() {
  const [toDoItems, setToDoItems] = useLocalstorage('toDoItems', [...initialToDoItemsList]);
  const [formDirtyState, setFormDirtyState] = useLocalstorage('formDirtyState', { isDirty: false });

  function resetToDoItems() {
    setToDoItems([...initialToDoItemsList]);
    setFormDirtyState({ isDirty: false });
  }

  function updateToDoItems(newToDoItems) {
    const toDoItemState = typeof newToDoItems === 'function' ? newToDoItems(toDoItems) : newToDoItems;

    if (!isToDoItemsList(toDoItemState)) {
      console.error('Invalid toDoItems structure:', toDoItemState);
      return;
    }

    setToDoItems(newToDoItems);
    setFormDirtyState({ isDirty: true });
  }

  useEffect(() => {
    if (!isToDoItemsList(toDoItems)) {
      resetToDoItems();
    }
  }, [toDoItems]);

  return (
    <div className="App container">
      <h1>ADHD To-Do List</h1>
      <ToDoForm toDoItems={toDoItems} setToDoItems={updateToDoItems} formDirtyState={formDirtyState} />
      <ResetButton resetToDoItems={resetToDoItems} />
      <ProgressBar toDoItems={toDoItems} />
    </div>
  );
}

export default App;
