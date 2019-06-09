import React from "react";
import "./FilterPane.sass";

const carTypes = ["Hatchback", "SUV", "Sedan", "Mini SUV"];
const fuelTypes = ["Diesel", "Petrol"]
const transmission = ["Manual", "Automatic"]

function FilterPane(props) {
    return <aside className={`${(props.open) ? "open" : ""} filter-pane`}>
        <button className="close-btn" onClick={props.onClose}>&#10005;</button>
        <h1>Car Type</h1>
        <div>
            {
                carTypes.map(type => <label key={type}>
                    <input 
                        type="radio" 
                        name="carType" 
                        value={type} 
                        checked={props.filters.carType === type}
                        onChange={props.onChange}/> {type}
                </label>)
            }
        </div>
        <h1>Fuel Type</h1>
        <div>
            {
                fuelTypes.map(type => <label key={type}>
                    <input 
                        type="radio" 
                        name="fuelType" 
                        value={type} 
                        checked={props.filters.fuelType === type}
                        onChange={props.onChange}/> {type}
                </label>)
            }
        </div>
        <h1>Transmission</h1>
        <div>
            {
                transmission.map(type => <label key={type}>
                    <input 
                        type="radio" 
                        name="transmission" 
                        value={type} 
                        checked={props.filters.transmission === type}
                        onChange={props.onChange}/> {type}
                </label>)
            }
        </div>
        <button onClick={props.onClearAll} className="danger">CLEAR ALL</button>
    </aside>;
}

export default FilterPane;