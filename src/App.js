import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useReducer, useState, useRef } from "react";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

//components
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = { ...action.data };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    // action.data는 하나의 일기 데이터가 될 것임.
    // targetId와 일치하면 newState에 해당 데이터(action.data)를 뿌려주고, 그렇지 않으면 반복을 지속한다
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

// state, method에 대해 "각각" context를 만들어준다
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []); //일기 데이터 관리: data

  const dataId = useRef(0);

  const onCreate = ({ date, content, emotion }) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: date,
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    console.log(targetId);
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/new" element={<New></New>}></Route>
              <Route path="/edit/:id" element={<Edit></Edit>}></Route>
              <Route path="/diary/:id" element={<Diary></Diary>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
