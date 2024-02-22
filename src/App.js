import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useReducer, useState, useRef } from 'react';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

//components
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

const reducer = (state, action) => {

  let newState= [];

  switch (action.type){
    case 'INIT': {
      return action.data;
    }
    case 'CREATE' :{
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    // action.data는 하나의 일기 데이터가 될 것임.
    // targetId와 일치하면 newState에 해당 데이터(action.data)를 뿌려주고, 그렇지 않으면 반복을 지속한다
    case 'EDIT' : {
      newState = state.map((it)=>it.id===action.data.id ? {...action.data} : it);
      break;
    }
    default : 
      return state;
  }

  return newState;
}

// state, method에 대해 "각각" context를 만들어준다
export const DiaryStateContext=  React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  { 
    id:1,
    emotion:1,
    content:"오늘의 일기 1번",
    date:1708613216370
  },
  { 
    id:2,
    emotion:2,
    content:"오늘의 일기 2번",
    date:1708613216369
  },
  { 
    id:3,
    emotion:3,
    content:"오늘의 일기 3번",
    date:1708613216368
  },
  { 
    id:4,
    emotion:4,
    content:"오늘의 일기 4번",
    date:1708613216367
  },
  { 
    id:5,
    emotion:5,
    content:"오늘의 일기 5번",
    date:1708613216366
  },
  { 
    id:6,
    emotion:5,
    content:"오늘의 일기 6번",
    date:1608613216366
  },
];

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData); //일기 데이터 관리: data

  const dataId= useRef(0);

  const onCreate = ({date, content, emotion}) => {
      dispatch({
        type: 'CREATE',
        data: {
          id: dataId.current,
          date: new Date(date).getTime,
          content,
          emotion,
        }
      })
      dataId.current+=1;
  };

  const onRemove = ({targetId}) => {
    dispatch({
      type: 'REMOVE',
      targetId,
    });
  };
  
  const onEdit = ({targetId, date, content, emotion}) => {
    dispatch({
      type: 'EDIT',
      data: {
        id:targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      }
    })
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
      <BrowserRouter>
      <div className='App'>
        <Routes>
            <Route path="/" element={<Home></Home>}></Route> 
            <Route path="/new" element={<New></New>}></Route>
            <Route path="/edit" element={<Edit></Edit>}></Route>
            <Route path="/diary/:id" element={<Diary></Diary>}></Route>
          </Routes>   
      </div>
        </BrowserRouter>
        </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
 
export default App;
