import store from "./Store.js";

class App extends React.Component {
  constructor() {
    // 생성 시저에 부모의 생성자 함수 호출
    super();
    // state라는 객체를 등록해 상태를 만든다
    this.state = { searchKeyword: "", searchResult: [], submitted: false };
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
    this.setState({ searchResult, submitted: true });
  }

  handleReset() {
    this.setState({
      searchKeyword: "",
      searchResult: [],
      submitted: false,
    });
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
    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">{this.state.submitted && searchResult}</div>
        </div>
      </>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#app"));
