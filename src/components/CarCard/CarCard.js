import React from "react";
import "./CarCard.sass";

function getButtonText(isUnavailable, isSelected) {
    if (isUnavailable)
        return "Not Available";
    if (isSelected)
        return "SELECTED";
    return "SELECT";
}

function CarCard(props) {
    const {
        id,
        name,
        carType,
        fuelType,
        seats,
        photo,
        price,
        availability,
        location,
        isSelected,
        transmission
    } = props.car;

    const isUnavailable = availability.indexOf(props.startDate.day()) === -1;
    return <div className="car-card">
        <header className="backgrounded">
            <h3>
                {name} ({fuelType})
            </h3>
        </header>
        
        <div className="card-content backgrounded">
            <img src={photo} alt={`${name}`} />
            <div>
                <p><strong>Location : </strong> {location}</p>
                <p><strong>Number of Seats : </strong> {seats}</p>
                <p><strong>Car Type : </strong> {carType}</p>
                <p><strong>Transmission : </strong> {transmission}</p>
            </div>
        </div>

        <footer className="backgrounded">
            <span className="price-tag">
                &#8377;{price}
            </span>
            <button
                className={isSelected ? "selected" : ""}
                disabled={isUnavailable}
                onClick={() => props.onSelect(id)}>{getButtonText(isUnavailable, isSelected)}</button>
        </footer>
    </div>;
}

export default CarCard;