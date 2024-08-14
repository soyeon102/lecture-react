import React from "react";
import Header from "./componets/Header";
import SearchForm from "./componets/SearchForm";
import store from "./Store";
import SearchResult from "./componets/SearchResult";
import Tabs, { TabType } from "./componets/Tabs";
import KeywordList from "./componets/KeywordList";
import HistoryList from "./componets/HistoryList";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      selectedTab: TabType.KEYWORD,
    };
  }

  handleChangeInput(searchKeyword) {
    if (searchKeyword.length <= 0) {
      this.handleReset();
    }
    this.setState({ searchKeyword });
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);

    this.setState({
      searchResult,
      submitted: true,
      searchKeyword,
    });
  }

  handleReset() {
    this.setState({
      searchKeyword: "",
      searchResult: [],
      submitted: false,
    });
  }

  render() {
    return (
      <>
        <Header title="검색" />
        <SearchForm
          value={this.state.searchKeyword}
          onChange={(event) => this.handleChangeInput(event)}
          onReset={() => this.handleReset()}
          onSubmit={() => this.search(this.state.searchKeyword)}
        />
        {this.state.submitted ? (
          <SearchResult data={this.state.searchResult} />
        ) : (
          <>
            <Tabs
              selectedTab={this.state.selectedTab}
              onChange={(selectedTab) => this.setState({ selectedTab })}
            />
            {this.state.selectedTab === TabType.KEYWORD && (
              <KeywordList onClick={(keyword) => this.search(keyword)} />
            )}
            {this.state.selectedTab === TabType.HISTORY && (
              <HistoryList onClick={(keyword) => this.search(keyword)} />
            )}
          </>
        )}
      </>
    );
  }
}

export default App;
