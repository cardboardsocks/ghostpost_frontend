import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roast_boast: [],

    };
  };

  componentDidMount() {
    fetch("http://localhost:8000/api/roast_boast")
      .then((res) => res.json())
      .then((data) => this.setState({roast_boast: data}));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/api/roast_boast/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
    })
        .then(res => res.json())
        .then(res => console.log(res))


    this.setState({ content: '', is_boast: true })
}



  handleUpvote = (id) => {
    fetch("http://localhost:8000/api/roast_boast/" + id + "/add_upvote/")
    .then((res) => res.json())
    .then((data) => this.forceUpdate(this.componentDidMount));
  }

  handleDownvote = (id) => {
    fetch("http://localhost:8000/api/roast_boast/" + id + "/add_downvote/")
    .then((res) => res.json())
    .then((data) => this.setState({downvote: data}));
  }

  handleBoasts = (event) => {
    fetch("http://localhost:8000/api/roast_boast/boasts/")
    .then((res) => res.json())
    .then((data) => this.setState({roast_boast: data}));
  }

  handleRoasts = (event) => {
    fetch("http://localhost:8000/api/roast_boast/roasts/")
    .then((res) => res.json())
    .then((data) => this.setState({roast_boast: data}));
  }

  handleSortVotes = (event) => {
    fetch("http://localhost:8000/api/roast_boast/most_popular/")
    .then((res) => res.json())
    .then((data) => this.setState({roast_boast: data}));
  }

  render() {
    return (
      <div>
        <h1 >Ghostpost</h1>
        <button onClick={this.handleBoasts}>Boasts</button> 
        <button onClick={this.handleRoasts}>Roasts</button>
        <button onClick={this.handleSortVotes}>Most Popular</button>
        <form onSubmit={this.handleSubmit}>
          <h3>Enter Text Here 
          <input
            id="content"
            name="input"
            type="text"
          /></h3>
          <h3>Click for Boast, Leave blank for Roast
          <input
            id="is_boast"
            value="true"
            type="checkbox"
          /></h3>
          <button>Create Post</button>
        </form>
        {this.state.roast_boast.map((p) => (
          <div>
          <h1>{p.is_boast ? 'Boast' : 'Roast'}</h1>
          <h4>
            ID: {p.id}
          </h4>
          <h4>
            Time Posted: {p.post_date}
          </h4>
          <h4>
            Content: {p.content}
          </h4>
          <h4>
            Total Votes: {p.votes}
            <button onClick={e => this.handleUpvote(p.id)}>
              Upvote
            </button>
            <button onClick={e => this.handleDownvote(p.id)}>
              Downvote
            </button>
          </h4>
          </div>
        ))}

      </div>
    );
  };
};

export default App;