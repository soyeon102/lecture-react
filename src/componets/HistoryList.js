import React from "react";
import List from "./List";
import store from "../Store";
import { formatRelativeDate } from "../helper";

const HistoryList = ({ onClick }) => {
  const [historyList, setHistoryList] = React.useState([]);

  const fetch = () => {
    const historyList = store.getHistoryList();
    setHistoryList([...historyList]);
  };

  const handleClickRemove = (event, keyword) => {
    event.stopPropagation();
    store.removeHistory(keyword);
    fetch();
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <List
      data={historyList}
      onClick={onClick}
      renderItem={(item) => (
        <>
          <span>{item.keyword}</span>
          <span className="date">{formatRelativeDate(item.date)}</span>
          <button
            className="btn-remove"
            onClick={(event) => handleClickRemove(event, item.keyword)}
          />
        </>
      )}
    />
  );
};

export default HistoryList;
