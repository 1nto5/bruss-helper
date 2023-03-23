import React, { useState, useEffect } from "react";

const ArticleCard = (props) => {
  const [articleNumber, setArticleNumber] = useState("");
  const handleClickArticle = () => {
    setArticleNumber(props.workplace);
  };
  useEffect(() => {
    if (articleNumber) {
      props.articleLogin(articleNumber);
    }
  }, [articleNumber]);

  return (
    <button onClick={handleClickArticle} className="articles--button">
      {props.workplace}
    </button>
  );
};

export default ArticleCard;
