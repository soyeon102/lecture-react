import { formatRelativeDate } from "./js/helper.js";
import store from "./js/Store.js";

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
};

class App extends React.Component {
  constructor() {
    // 생성 시저에 부모의 생성자 함수 호출
    super();
    // state라는 객체를 등록해 상태를 만든다
    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      selectedTab: TabType.KEYWORD,
      keywordList: [],
      historyList: [],
    };
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;
    if (searchKeyword.length === 0) return this.handleReset();
    // 컴포넌트의 상태 갱신을위해 setState메서드를 사용
    this.setState({ searchKeyword });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
    const historyList = store.getHistoryList();
    this.setState({
      searchResult,
      submitted: true,
      searchKeyword,
      historyList,
    });
  }

  handleReset() {
    this.setState({
      searchKeyword: "",
      searchResult: [],
      submitted: false,
    });
  }

  handleClickRemoveHistory(event, keyword) {
    event.stopPropagation();

    store.removeHistory(keyword);
    const historyList = store.getHistoryList();
    this.setState({ historyList });
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    const historyList = store.getHistoryList();
    this.setState({ keywordList, historyList });
  }

  render() {
    const searchForm = (
      <form
        onSubmit={(event) => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          autoFocus
          value={this.state.searchKeyword}
          onChange={(event) => this.handleChangeInput(event)}
        />
        {this.state.searchKeyword.length > 0 && (
          <button type="reset" className="btn-reset" />
        )}
      </form>
    );

    const searchResult =
      this.state.searchResult.length <= 0 ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <ul>
          {this.state.searchResult.map((item) => (
            <li key={item.id}>
              <img src={item.imageUrl} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      );

    const keywordList = (
      <ul className="list">
        {this.state.keywordList.map((item, index) => (
          <li key={item.id} onClick={() => this.search(item.keyword)}>
            <span className="number">{index + 1}</span>
            <span>{item.keyword}</span>
          </li>
        ))}
      </ul>
    );

    const historyList = (
      <ul className="list">
        {this.state.historyList.map(({ id, keyword, date }) => (
          <li key={id} onClick={() => this.search(keyword)}>
            <span>{keyword}</span>
            <span className="date">{formatRelativeDate(date)}</span>
            <button
              className="btn-remove"
              onClick={(event) => this.handleClickRemoveHistory(event, keyword)}
            />
          </li>
        ))}
      </ul>
    );

    const tabs = (
      <>
        <ul className="tabs">
          {Object.values(TabType).map((tabType) => (
            <li
              key={tabType}
              className={this.state.selectedTab === tabType ? "active" : ""}
              onClick={() => this.setState({ selectedTab: tabType })}
            >
              {TabLabel[tabType]}
            </li>
          ))}
        </ul>
        {this.state.selectedTab === TabType.KEYWORD && keywordList}
        {this.state.selectedTab === TabType.HISTORY && historyList}
      </>
    );

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">
            {this.state.submitted ? searchResult : tabs}
          </div>
        </div>
      </>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#app"));
