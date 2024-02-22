import { useParams } from "react-router-dom";

const Diary = () => {
     
    const {id} = useParams();
    console.log(id);
    
    return(
        <div>
            <h1>Diary</h1>
            <p>이곳은 일기를 확인하는 공간입니다.</p>
        </div>
    )
}

export default Diary;