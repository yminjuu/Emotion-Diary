import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const areEqual = (value, onChange, optionList) => {};

//React.memo 사용: prop이 바뀌지 않으면 랜더링이 일어나지 않게 방지한다.
//만약 props로 받는 onChange 함수가 state의 상태 변화 함수가 아니라
//일반 함수였다면 해당 함수를 useCallback 메서드를 사용하여 묶어줘야 했을 것이다.
//결론적으로 기억해야 할 것은 state의 상태 변화 함수는 동일한 메모리를 보장한다는 것임!
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const emotionOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("latest");
  //sortType: 현재 어떤 필터가 적용되어야 하는가?
  // 1. latest 2. oldest

  const [emotionType, setEmotionType] = useState("all");
  //emotionType: 현재 어떤 감정을 보여야 하는가?
  // 1. all 2. good 3. bad

  //시간순 정보 필터링을 위한 함수: 정렬된 다이어리 리스트를 반환
  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      console.log("filterclalback");
      if (emotionType === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        //시간이 작아야 우선순위가 큼
        return parseInt(b.date) - parseInt(a.date);
      } else if (sortType === "oldest") {
        //커야 우선순위가 큼
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    //깊은 복사: stringify: 배열을 문자열화해서 저장해줌
    // parse: 문자열을 다시 배열로 복호화해줌
    //깊은 복사를 하는 이유: 원본 배열을 훼손시키지 않기 위해서

    const filteredList =
      emotionType === "all"
        ? copyList
        : copyList.filter((it) => filterCallback(it)); //직접 만든 필터링 함수를 전달: return true일 때에만 배열에 할당됨
    const sortedList = filteredList.sort(compare); //sort메서드에 직접 만든 비교함수를 전달한다.
    return sortedList;
  };
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          ></ControlMenu>
          <ControlMenu
            value={emotionType}
            onChange={setEmotionType}
            optionList={emotionOptionList}
          ></ControlMenu>
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => {
              navigate("/new");
            }}
          ></MyButton>
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem {...it} key={it.id}></DiaryItem>
      ))}
    </div>
  );
};

//디폴트 props를 빈 배열로 전달
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
