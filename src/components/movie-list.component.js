import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Movie = props => (
  <tr>
    <td>{props.movie.name}</td>
    <td>{props.movie.gross}</td>
    <td>{props.movie.ratings}</td>
    <td>{props.movie.date.substring(0,10)}</td>
     <td>
      <a href="#" onClick={() => { props.deleteMovie(props.movie._id) }}>Remove From List</a>
    </td>
  </tr>
)

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.deleteMovie = this.deleteMovie.bind(this)

    this.state = {movies: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/movie/')
      .then(response => {
        this.setState({ movies: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMovie(id) {
    axios.delete('http://localhost:5000/movie/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      movies: this.state.movies.filter(el => el._id !== id)
    })
  }

  MovieList() {
    return this.state.movies.map(currentMovie => {
      return <Movie movie={currentMovie} deleteMovie={this.deleteMovie} key={currentMovie._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Movies List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Movie Name</th>
              <th>Movie Grossing</th>
              <th>Ratings</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.MovieList() }
          </tbody>
        </table>
      </div>
    )
  }
}