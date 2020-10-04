import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roast_boast: [],

    };
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  componentDidMount() {
    fetch("http://localhost:8000/api/roast_boast")
      .then((res) => res.json())
      .then((data) => this.setState({post: data}));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      is_boast: document.getElementById("is_boast"),
      content: document.getElementById("content").value
    }

    fetch("http://localhost:8000/api/roast_boast/", {
      method: "POST",
      headers: {"content": "application/json"},
      body: JSON.stringify(data),
    });
  }



  handleUpvote = (id) => {
    fetch("http://localhost:8000/api/roast_boast/" + id + "/add_upvote/")
    .then((res) => res.json())
    .then((data) => this.forceUpdate(this.componentDidMount));
  }

  handleDownvote = (id) => {
    fetch("http://localhost:8000/api/roast_boast/" + id + "/add_downvote/")
    .then((res) => res.json())
    .then((data) => this.forceUpdate(this.componentDidMount));
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
          <h3>Check for Boast, Leave blank for Roast
          <input
            id="is_boast"
            value="is_boast"
            type="checkbox"
          /></h3>
          <button>Create Post</button>
        </form>
        {this.state.roast_boast.map((p) => (
          <div>
          <h1>{p.is_boast ? 'Boast' : 'Roast'}</h1>
          <h2>
            ID: {p.id}
          </h2>
          <h2>
            Time Posted: {p.post_date}
          </h2>
          <h2>
            Content: {p.content}
          </h2>
          <h2>
            Total Votes: {p.total}
            <button onClick={e => this.handleUpvote(p.id)}>
              Upvote
            </button>
            <button onClick={e => this.handleDownvote(p.id)}>
              Downvote
            </button>
          </h2>
          </div>
        ))}

      </div>
    );
  };
};

export default App;