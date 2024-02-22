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
    const navigate = useNavigate();

    //날짜 관리 (월, 년)------
    const [curDate, setCurDate] = useState(new Date()); //기본값: 현재 시간

    const onIncrease = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()));
    };

    const onDecrease = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()));
    };

    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`;

    //날짜에 따른 데이터 관리
    useEffect(()=> {
        if (diaryList.length>=1){
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
    
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth()+1,
                0
            ).getTime();
    
            setData(diaryList.filter((it)=>firstDay <= it.date && it.date < lastDay ));
            }}, [diaryList, curDate]
    );

    useEffect(()=>{
        console.log(data);
    }, [data]);

    return(
        <div>
        <MyHeader leftChild={<MyButton text={"<"} onClick={onDecrease}></MyButton>} headText={headText} rightChild={<MyButton onClick={onIncrease} text={">"}></MyButton>}></MyHeader>
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <select className="ControlMenu">
                        <option value={"latest"}>최신순</option>
                        <option value={"oldest"}>오래된 순</option>
                    </select>
                    <select className="ControlMenu">
                        <option value={"all"}>전부 다</option>
                        <option value={"good"}>좋은 감정만</option>
                        <option value={"bad"}>안 좋은 감정만</option>
                    </select>
                </div>
                <div className="right_col">
                    <button className="MyButton MyButton_positive" onClick={()=>{navigate("/new")}}>새 일기 쓰기</button>
                </div>
            </div>
            <DiaryList className="diaryList" diaryList={data}></DiaryList>
        </div>
        </div>
    )

}


export default Home;