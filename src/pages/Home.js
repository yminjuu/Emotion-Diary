import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryList from "../components/DiaryList";

import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

const Home = () => {
  //일기 리스트 관리------
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);

  //날짜 관리 (월, 년)------
  const [curDate, setCurDate] = useState(new Date()); //기본값: 현재 시간

  const onIncrease = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const onDecrease = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  //날짜에 따른 데이터 관리
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date < lastDay)
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {}, [data]);

  return (
    <div>
      <MyHeader
        leftChild={<MyButton text={"<"} onClick={onDecrease}></MyButton>}
        headText={headText}
        rightChild={<MyButton onClick={onIncrease} text={">"}></MyButton>}
      ></MyHeader>
      <DiaryList diaryList={data}></DiaryList>
    </div>
  );
};

export default Home;
