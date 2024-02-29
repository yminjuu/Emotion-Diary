import DiaryEditor from "../components/DiaryEditor";
import MyButton from "../components/MyButton";
import { Navigate, useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import { useEffect } from "react";

const New = () => {
  const navigate = useNavigate();

  //페이지마다 title 변경하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - 새로운 일기 작성`;
  });

  return (
    <div>
      <MyHeader
        headText={"새 일기 쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            type={"default"}
            onClick={() => {
              navigate(-1);
            }}
          ></MyButton>
        }
      ></MyHeader>
      <DiaryEditor></DiaryEditor>
    </div>
  );
};

export default New;
