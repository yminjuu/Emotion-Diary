import { useNavigate, useParams } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryPage from "../components/DiaryPage";
import { getStringDate } from "../util/date";

const Diary = () => {
  const { id } = useParams(); //몇번째 diary인지 받아옴
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  //페이지마다 title 변경하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  });

  //일기 데이터 관리
  const [pageData, setPageData] = useState();

  //누른 일기 데이터 객체만 받아옴 - 전체 일기 데이터가 1개 이상일 때에만/ useEffect를 사용해서 처음 마운트될 때에만
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        //truthy
        //targetDiary를 찾았다면
        setPageData(targetDiary);
      } else {
        //falsy
        console.log("hi");
        alert("없는 일기입니다");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      <MyHeader
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            type={"default"}
            onClick={() => {
              navigate(-1);
            }}
          ></MyButton>
        }
        headText={pageData && `${getStringDate(new Date(pageData.date))} 기록`}
        rightChild={
          <MyButton
            text={"수정하기"}
            type={"default"}
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
          ></MyButton>
        }
      ></MyHeader>
      <div>{pageData && <DiaryPage pageData={pageData}></DiaryPage>}</div>
    </div>
  );
};

export default Diary;
