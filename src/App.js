import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_boast: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/roast_boast/')
      .then((res) => res.json())
      .then((data) => this.setState({ is_boast: data.results }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      is_boast: document.getElementById("is_boast").checked,
      user_input: document.getElementById("content").value
    }

    fetch("http://localhost:8000/api/roast_boast/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
  }

  handleUpvote = (id) => {
    fetch("http://localhost:8000/api/roast_boast/" + id + "/upvote/")
    .then((res) => res.json())
    .then((data) => this.forceUpdate(this.componentDidMount));
  }

  handleDownvote = (id) => {
    fetch("http://localhost:8000/api/roast_boast/" + id + "/downvote/")
    .then((res) => res.json())
    .then((data) => this.forceUpdate(this.componentDidMount));
  }

  handleBoasts = (e) => {
    fetch("http://localhost:8000/api/roast_boast/boasts/")
    .then((res) => res.json())
    .then((data) => this.setState({roast_boast: data}));
  }

  handleRoasts = (e) => {
    fetch("http://localhost:8000/api/roast_boast/roasts/")
    .then((res) => res.json())
    .then((data) => this.setState({roast_boast: data}));
  }

  handleSortVotes = (e) => {
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
        <button onClick={this.total_votes}>Most Popular</button>

        <form onSubmit={this.handleSubmit}>
          <h3>What do you want to say? 
          <input
            id="is_boast"
            name="input"
            type="text"
          /></h3>
          <h4>Check for boast, leave blank for roast.
          <input
            id="is_boast"
            value="Post"
            type="checkbox"
          /></h4>
          <button>Create Post</button>
        </form>
        {this.state.roast_boast.map((p, id) => (
          <div key ={id}>
          <h1>{p.is_boast ? 'Boast' : 'Roast'}</h1>
          <h2>
            Created: {p.post_date}
          </h2>
          <h2>
            Content: {p.content}
          </h2>
          <h2>
            Upvotes: {p.upvotes}
            Downvotes:{p.downvotes}
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