import React from "react";

const EmotionItem = ({
  emotion_id,
  isSelected,
  emotion_img,
  emotion_discript,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off",
      ].join(" ")}
    >
      <img src={emotion_img}></img>
      <span>{emotion_discript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
