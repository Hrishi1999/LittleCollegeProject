import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGross = this.onChangeGross.bind(this);
    this.onChangeRatings = this.onChangeRatings.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      gross: '',
      ratings: '',
      date: new Date(),
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeGross(e) {
    this.setState({
      gross: e.target.value
    })
  }

  onChangeRatings(e) {
    this.setState({
      ratings: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const movie = {
      name: this.state.name,
      gross: this.state.gross,
      ratings: this.state.ratings,
      date: this.state.date
    }

    console.log(movie);

    axios.post('http://localhost:5001/movie/add', movie)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Add a new movie</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
          <label>Movie Title: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group"> 
          <label>Gross (In Millions): </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.gross}
              onChange={this.onChangeGross}
              />
        </div>
        <div className="form-group">
          <label>Ratings: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.ratings}
              onChange={this.onChangeRatings}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Add Movie" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}