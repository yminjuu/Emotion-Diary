import { useNavigate, useSearchParams } from "react-router-dom";

let toggle= 0;

const Edit = () => {
    //useNavigate는 다른 url로 가게 해주는 함수를 반환한다.
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const id= searchParams.get('id');
    console.log(`id: ${id}`);

    const mode = searchParams.get('mode');
    console.log(`mode: ${mode}`);

    const change = () => {
        //setSearchParams에 객체를 전달한다.
        if (toggle===0) {
            setSearchParams({
            who: 'MARK'
        });
        toggle=1;
    }
    else {
        if (toggle===1) {
            setSearchParams({
            id: '2024',
            mode: 'dark',
        });
        toggle=0;
    }}
    };

    return(
        <div>
            <h1>Edit</h1>
            <p>이곳은 일기를 수정하는 페이지입니다.</p>
            <button onClick={change}>QueryString 바꾸기</button>
            <button onClick={()=>{
                navigate("/home");
            }}>HOME으로 가기</button>
            <button onClick={()=>
            {
                navigate(-1); //뒤로가기
            }}>뒤로가기</button>
        </div>
    )
}

export default Edit;

