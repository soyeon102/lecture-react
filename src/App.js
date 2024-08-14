import React from "react";
import Header from "./componets/Header";
import SearchForm from "./componets/SearchForm";
import store from "./Store";
import SearchResult from "./componets/SearchResult";
import Tabs, { TabType } from "./componets/Tabs";
import KeywordList from "./componets/KeywordList";
import HistoryList from "./componets/HistoryList";

const App = () => {
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(TabType.KEYWORD);

  const handleChangeInput = (searchKeyword) => {
    if (searchKeyword.length <= 0) {
      handleReset();
    }
    setSearchKeyword(searchKeyword);
  };

  const search = (searchKeyword) => {
    const searchResult = store.search(searchKeyword);

    setSearchResult(searchResult);
    setSubmitted(true);
    setSearchKeyword(searchKeyword);
  };

  const handleReset = () => {
    setSearchKeyword("");
    setSearchResult([]);
    setSubmitted(false);
  };

  return (
    <>
      <Header title="검색" />
      <SearchForm
        value={searchKeyword}
        onChange={handleChangeInput}
        onReset={handleReset}
        onSubmit={() => search(searchKeyword)}
      />
      {submitted ? (
        <SearchResult data={searchResult} />
      ) : (
        <>
          <Tabs
            selectedTab={selectedTab}
            onChange={(selectedTab) => setSelectedTab(selectedTab)}
          />
          {selectedTab === TabType.KEYWORD && (
            <KeywordList onClick={(keyword) => search(keyword)} />
          )}
          {selectedTab === TabType.HISTORY && (
            <HistoryList onClick={(keyword) => search(keyword)} />
          )}
        </>
      )}
    </>
  );
};

export default App;
