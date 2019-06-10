import React from "react";
import "./Paginator.sass";

function Paginator(props) {
    let {pageNumber, pageSize, totalElements} = props;
    // We'll be showing at least one page.
    const totalPages = Math.max(Math.ceil(totalElements / pageSize), 1);
    
    return <div className="paginator backgrounded">
        <div className="search-wrapper">
            <input 
                type="text" 
                placeholder="Search..." 
                value={props.query}
                onChange={props.onChange}/>
        </div>
        <nav className="">
            <button name="previous" onClick={props.onPageChange}>&larr;</button>
            <span>{pageNumber + 1} / {totalPages}</span>
            <button name="next" onClick={props.onPageChange}>&rarr;</button>
        </nav>
    </div>;
}

export default Paginator;