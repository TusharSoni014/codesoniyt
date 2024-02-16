import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
  isOwner: boolean;
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `
<html lang="en">
  <body>
    <div class="container">
        <h1>To-Do List</h1>
        <input type="text" id="taskInput" placeholder="Enter your task">
        <button onclick="addTask()">Add Task</button>
        <ul id="taskList"></ul>
    </div>
  <script src="script.js"></script>
  </body>
</html>
    `,
    css: `
  body {
      font-family: 'Arial', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50vh;
      margin: 0;
    border:1px solid blue;
  }
  
  .container {
      text-align: center;
  }
  
  input {
      padding: 8px;
      margin-right: 8px;
  }
  
  button {
      padding: 8px;
  }  
    `,
    javascript: `
    function addTask() {
  
      var taskInput = document.getElementById('taskInput');
      var taskList = document.getElementById('taskList');
      if (taskInput.value !== '') {
          var taskItem = document.createElement('li');
          taskItem.textContent = taskInput.value;
          taskList.appendChild(taskItem);
          taskInput.value = '';
  
          taskItem.addEventListener('click', function () {
              taskList.removeChild(taskItem);
          });
      }
  }
  
    `,
  },
  currentLanguage: "html",
  isOwner: false,
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateIsOwner: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload;
    },
    updateFullCode: (
      state,
      action: PayloadAction<CompilerSliceStateType["fullCode"]>
    ) => {
      state.fullCode = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const {
  updateCurrentLanguage,
  updateCodeValue,
  updateFullCode,
  updateIsOwner,
} = compilerSlice.actions;
