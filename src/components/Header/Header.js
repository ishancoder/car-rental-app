import React from "react";
import "./Header.sass";

function Header(props) {
    return <header className={`${(props.fullScreen) ? "full-screen" : "collapse"} backgrounded controls main-header`}>
        <h1 className="title">Rent Your <span role="img" aria-label="car">🚗</span></h1>
        <div className="input-wrapper">
            <input type="text" name="location" onChange={props.handleFilterChange} placeholder="Location" value={props.location}/>
            <input type="date" name="startDate" onChange={props.handleDateChange} defaultValue={props.startDate.format("YYYY-MM-DD")}/>
        </div>
        <button onClick={props.handleSubmit}>SUBMIT</button>
    </header>;
}

export default Header;