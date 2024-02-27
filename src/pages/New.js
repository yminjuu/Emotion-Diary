import DiaryEditor from "../components/DiaryEditor";
import MyButton from "../components/MyButton";
import { Navigate, useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";

const New = () => {
    const navigate = useNavigate();

    return <div>
        <MyHeader headText={"새 일기 쓰기"} leftChild={<MyButton text={"< 뒤로가기"} type={"default"} onClick={()=>{navigate(-1)}}></MyButton>}></MyHeader>
        <DiaryEditor></DiaryEditor>
    </div>
}

export default New;