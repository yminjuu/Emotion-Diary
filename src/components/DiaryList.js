const DiaryList = ({diaryList}) => {
    console.log("diarylist");
    console.log({diaryList});
    return (
    <div>
        {diaryList.map((it)=>(
            <div key={it.id}>{it.content}</div>
        ))}
    </div>)
}

DiaryList.defaultProps = {
    diaryList : [],
};
export default DiaryList;