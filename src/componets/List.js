// 추천 검색어와 최근 검색어의 공통 로직을 다루는 리스트 컴포넌트 생성
import React from "react";

const List = (props) => {
  const { data = [], onClick, renderItem } = props;

  return (
    <ul className="list">
      {data.map((item, index) => (
        <li key={item.id} onClick={() => onClick(item.keyword)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
};

export default List;
