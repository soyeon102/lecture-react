import React from "react";
import store from "../Store";
import List from "./List";

const KeywordList = ({ onClick }) => {
  const [keywordList, setKeywordList] = React.useState([]);

  React.useEffect(() => {
    const keywordList = store.getKeywordList();
    setKeywordList([...keywordList]);
  }, []);

  return (
    <List
      data={keywordList}
      onClick={onClick}
      renderItem={(item, index) => (
        <>
          <span className="number">{index + 1}</span>
          <span>{item.keyword}</span>
        </>
      )}
    />
  );
};

export default KeywordList;
