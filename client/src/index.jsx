/*
FRONT END
To Do:
index search (possibly needs api tie)
repolist needs repolist entry

Issues:
Cannot read property 'setState' of undefined on handle change
adding .bind to .search in Search.jsx removes error but search button only says 'was searched' why can I not see $terms
*/


import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) { 
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) { //re-render on event based on search criteria
    console.log(`${term} was searched`);
    // Needs to send query term to Server file
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));