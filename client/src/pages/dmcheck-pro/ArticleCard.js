import React, { useState, useEffect } from "react";

const ArticleCard = (props) => {
  const [articleNumber, setArticleNumber] = useState("");
  const handleClickArticle = () => {
    setArticleNumber(props.article);
  };
  useEffect(() => {
    if (articleNumber) {
      props.articleLogin(articleNumber);
    }
  }, [articleNumber]);

  return (
    <button
      onClick={handleClickArticle}
      className="ml-8 mr-8 mb-16 rounded bg-gray-100 p-10 text-center text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
    >
      <span className="block text-4xl tracking-widest">{props.article}</span>
      <span className="block font-extralight">{props.name}</span>
    </button>
  );
};

export default ArticleCard;
