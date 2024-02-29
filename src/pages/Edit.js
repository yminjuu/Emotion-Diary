import { useNavigate, useParams } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryEditor from "../components/DiaryEditor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
  //id와 diaryList 받아오기
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();

  //페이지마다 title 변경하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  });

  //수정 데이터 저장 state
  const [originData, setOriginData] = useState(); //수정할 원본 데이터

  //수정하기를 누른 일기 데이터를 불러오기 위함
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
        //truthy, falsy를 사용하여 targetDiary가 truthy할 때에만 수정 페이지를 띄운다
      } else {
        console.log("navigate");
        navigate("/", { replace: true }); //replace: true -> 뒤로가기를 못하게 막는다
      }
    }
  }, [id, diaryList]);
  //useEffect를 사용하여
  //id와 diaryList가 달라지면 새로 받아와야 하기 때문에

  //삭제 작업 처리
  const onRemove = useContext(DiaryDispatchContext).onRemove;

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      console.log(id);
      console.log(originData.id);
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  return (
    <div>
      <MyHeader
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            type={"default"}
            onClick={() => {
              navigate("/");
            }}
          ></MyButton>
        }
        headText={"일기 수정하기"}
        rightChild={
          <MyButton
            type={"negative"}
            text={"삭제하기"}
            onClick={handleDelete}
          ></MyButton>
        }
      ></MyHeader>
      <div>
        {originData && (
          <DiaryEditor isEdit={true} originData={originData}></DiaryEditor>
        )}
      </div>
    </div>
  );
};
export default Edit;
