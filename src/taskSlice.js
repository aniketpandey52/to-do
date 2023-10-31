// taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

let taskIndex = 0

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
const day = String(today.getDate()).padStart(2, '0');

const todayDateString = `${day}-${month}-${year}`;

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    createTask: (state, action) => {
      let task = {...action.payload}
      task["taskId"] = taskIndex++
      console.log(task["taskId"])
      state.push(task);
    },
    removeTask: (state, action) => {
      const taskIdToRemove = action.payload.taskId;
      return state.filter(task => task.taskId !== taskIdToRemove);
    },
    toggleTaskStatus: (state, action) => {
      const taskId = action.payload.taskId;
      const task = state.find(task => task.taskId === taskId);
      if (task) {
        if(!task.completed){
          task.end_date = todayDateString;
        } else {
          task.end_date = null
        }
        task.completed = !task.completed; // Toggle task status
      }
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload.updatedTask;
      const index = state.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state[index] = updatedTask;
      }
    }
  },
});

export const { createTask, removeTask, toggleTaskStatus, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
