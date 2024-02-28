import { emotionList } from "../util/emotion";

const DiaryPage = ({ pageData }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  console.log(emotionList[pageData.emotion - 1]);

  return (
    <div className="DiaryPage">
      <section>
        <h4>오늘의 감정</h4>
        <div
          className={`diary_img_wrapper diary_img_wrapper_${pageData.emotion}`}
        >
          <img src={emotionList[pageData.emotion - 1].emotion_img}></img>
          <div className="emotion_discript">
            {emotionList[pageData.emotion - 1].emotion_discript}
          </div>
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="diary_content_wrapper">
          <p>{pageData.content}</p>
        </div>
      </section>
    </div>
  );
};

export default DiaryPage;
