import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.search.bind(this);
  }

  onChange (e) {
    this.setState({ //lookup setstate in react
      term: e.target.value
    });
  }

  search() {
    console.log('this.props.onSearch', this.props.onSearch);
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange}/>       
      <button onClick={this.search}> Add Repos </button>
    </div>) 
  } //adding bind this to .search in render gets rid of error
}

export default Search;