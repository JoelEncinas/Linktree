import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);

  return (
    <div className="App">
      <h1>Hello from react</h1>
      <div className="todos">
        <div className="todo">
          <div className="checkbox"></div>
          <div className="text">get the bread</div>
          <div className="delete-todo">x</div>
        </div>

        <div className="todo is-complete">
          <div className="checkbox"></div>
          <div className="text">get the milk</div>
          <div className="delete-todo">x</div>
        </div>
      </div>
    </div>
  );
}

export default App;
