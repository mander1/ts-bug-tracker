import React, { FormEvent, useState } from 'react';
import './App.css';
import { BugPriority, iBug } from './iBug';
import { v4 as uuid } from 'uuid';
import BugListTable from './BugListTable';

function App() {
  const [newBugDescription, setNewBugDescription] = useState <string> ('');
  const [newBugPriority, setNewBugPriority]= useState <string> ('Medium');
  const [bugList, setBugList] = useState <iBug[]>([]);

  const addBug = (event: FormEvent) => {
    event.preventDefault();
    const newBug: iBug ={
      id: uuid(),
      description: newBugDescription,
      priority: newBugPriority as BugPriority,
    }

    setBugList([
      ...bugList,
      newBug
    ]);

    setNewBugDescription('');
    setNewBugPriority('Medium');

  };
  const deleteBug = (id: string) => {
    const bugs = bugList.filter(bug => bug.id !== id);

    setBugList(bugs);
  };

    return (
    <div className='app'>
      <h1>🐞Bug Tracker 101</h1>
      <BugListTable bugs = {bugList} onDeleteBug = {(id: string) => deleteBug(id)} />
      <form className = "add-new-bug-form" onSubmit={addBug}>
        <label htmlFor='newBugDescription'>
         Descripiton:
        </label>
        <input type='text' id='newBugDescription' placeholder='Enter bug description here' maxLength={50} value={newBugDescription} onChange={event => setNewBugDescription(event.target.value)} required/>
        <label htmlFor='newBugPriority'>
          Bug priority:
          </label>
          <select id="newBugPriority" value = {newBugPriority} onChange = {event => setNewBugPriority(event.target.value)}>
          <option value = "Low">Low</option>
          <option value = "Medium">Medium</option>
          <option value = "High">High</option>
          </select>
          <button type = "submit">Add New Bug</button>
        </form>
      </div>
  );
}

export default App;

