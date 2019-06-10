import React, {Component} from 'react';
import './App.sass';
import CarListings from './components/CarListings/CarListings';
import FilterPane from './components/FilterPane/FilterPane';
import moment from 'moment';
import Header from './components/Header/Header';

const filterValue = {
  location: "",
  transmission: "",
  carType: "",
  fuelType: ""
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      filters: {...filterValue},
      isFilterOpen: false,
      isLandingPageVisited: false,
      types: []
    };
  }

  handleDateChange = ({target: {value, name}}) => {
    value = moment(value, "YYYY-MM-DD");
    this.setState({startDate: value});
  };

  handleSubmit = () => {
    const {filters: {location}, startDate} = this.state;
    if(!location || !startDate)
      return;
    this.setState({isLandingPageVisited: true});
  };

  handleFilterChange = ({target: {name, value}}) => {
      this.setState(prevState => ({filters: {...prevState.filters, [name]: value}}));
  };

  toggleFilterPane = () => {
    this.setState(prevState => ({isFilterOpen: !prevState.isFilterOpen}));
  };

  clearFilters = () => {
    this.setState({filters: {...filterValue}});
  }

  render() {
    return <div className="App">
      <FilterPane 
        open={this.state.isFilterOpen} 
        onChange={this.handleFilterChange}
        filters={this.state.filters} 
        onClose={this.toggleFilterPane}
        onClearAll={this.clearFilters}/>
      <Header 
        startDate={this.state.startDate}
        location={this.state.location}
        fullScreen={!this.state.isLandingPageVisited}
        handleDateChange={this.handleDateChange}
        handleFilterChange={this.handleFilterChange}
        handleSubmit={this.handleSubmit}/>
      <CarListings
        startDate={this.state.startDate}
        location={this.state.location}
        query={this.state.query}
        filters={this.state.filters}/>
      {(this.state.isLandingPageVisited) ? <button className="action-btn filter-btn" onClick={this.toggleFilterPane}><span role="img" aria-label="filter">🌪️</span></button> : ""}
    </div>;
  }
}
export default App;
