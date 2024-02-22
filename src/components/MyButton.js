const MyButton = ({text, type, onClick}) => {

    const buttonType = ["positive", "negative"].includes(type) ? type : "default";
    //type이 이상한 게 들어오면 default로 초기화해줌

    return <button className={["MyButton", `MyButton_${type}`].join(" ")} onClick={onClick}>
        {text}
    </button>
}

MyButton.defaultProps = {
    type: "default",
};

export default MyButton;

// text: 버튼의 text
// type: 어떤 버튼인지 구분
// onClick: 클릭했을 때의 동작 