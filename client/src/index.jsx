/*
FRONT END
To Do:
index search (possibly needs api tie)
repolist needs repolist entry

Issues:
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
    console.log(`Searching for: ${term}`);
    // Needs to send query term to Server/index

    // use jQuery's ajax method to send a POST request to /repos
    $.ajax({
      type: "POST",
      url: "http://localhost:1128/repos",
      data: {term},
      success: (term)=>{
        console.log(term);
      },
      error: (err) => {
        console.error(err);
      },
    });

    // axios.post('/repos', {
    //   username: term
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });


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