import React, { Component } from "react";
import "./CarListings.sass";
import CarCard from "../CarCard/CarCard";
import { getCars } from "../../data/api";
import Paginator from "../Paginator/Paginator";
import { paginate } from "../../utils/utils";

class CarListings extends Component {
    constructor(props) {
        super(props);
        this.pageSize = 6;
        this.state = {
            cars: [],
            pageNumber: 0,
            query: ""
        };
    }

    handleSelect = carId => {
        // We'll be returning a new cars list rather than updating the currnt one
        // Fine the targeted car
        const targetIdx = this.state.cars.findIndex(car => car.id === carId);
        // Make sure that the car indeed exists in the state.
        if (targetIdx === -1)
            return;
        const targetCar = this.state.cars[targetIdx];
        // Set the car state using a brand new list.
        this.setState(prevState => ({
            cars: [
                ...prevState.cars.slice(0, targetIdx), // Former elements
                { ...targetCar, isSelected: !targetCar.isSelected }, // Modified element
                ...prevState.cars.slice(targetIdx + 1, prevState.cars.length) // Later elements
            ]
        }));
    };

    handlePageChange = ({ target: { name } }, totalElements) => {
        const totalPages = totalElements / this.pageSize;
        switch (name) {
            case "previous":
                this.setState(prevState => {
                    if (prevState.pageNumber > 0) {
                        return { pageNumber: prevState.pageNumber - 1 };
                    }
                })
                break;
            case "next":
                this.setState(prevState => {
                    if (prevState.pageNumber < totalPages - 1) {
                        return { pageNumber: prevState.pageNumber + 1 };
                    }
                })
                break;
            default:
                break;
        }
    };

    handleSearch = ({ target: { value } }) => {
        this.setState({ query: value });
    };

    applyFiltersAndGetCars() {
        const { filters } = this.props;
        // We're goint a little bit functional here and we're returning a brand new list of all the cars that pass the criteria.
        return this.state.cars.filter(car => {
            // We take all the keys in filter and match it with the cars property.
            // One major benifit ot doing it if we have to use another filter we don't have to change this logic.
            return Object.keys(filters).every(filterKey => {
                if (!filters[filterKey]) {
                    return true;
                }
                return filters[filterKey].toLocaleLowerCase() === car[filterKey].toLocaleLowerCase();
            })
        }).filter(car => {
            return car.name.toLocaleLowerCase().includes(this.state.query.toLocaleLowerCase())
        }).slice().sort((carA, carB) => {
            // Then we're going to sort the cars and put unavailable at the end
            const availableA = carA.availability.indexOf(this.props.startDate.day()) !== -1;
            const availableB = carB.availability.indexOf(this.props.startDate.day()) !== -1;
            // Since availableA and availableB are boolean values it'll be coerced as 1 and 0 for true and false by JS.
            return availableB - availableA;
        });
    }

    async componentDidMount() {
        // Get the list of all cars since the list has only 29 elements this is going to be pretty efficient.
        const cars = await getCars();
        this.setState({ cars });
    }

    render() {
        const cars = this.applyFiltersAndGetCars();
        const carPage = paginate(cars, this.state.pageNumber, this.pageSize);

        return <section className="car-listings">
            <Paginator
                pageNumber={this.state.pageNumber}
                pageSize={this.pageSize}
                totalElements={cars.length}
                onPageChange={ev => this.handlePageChange(ev, cars.length)}
                onChange={this.handleSearch}
            />
            <div className="card-section">
                {
                    carPage.map(car => {
                        return <CarCard
                            key={car.id}
                            car={car}
                            startDate={this.props.startDate}
                            onSelect={this.handleSelect} />;
                    })
                }
                {!carPage.length ? <h3 className="no-result">No Results were found</h3> : ""}
            </div>
        </section>
    }
}

export default CarListings;