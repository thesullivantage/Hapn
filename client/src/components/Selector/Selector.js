import React from "react";

const Selector = props => (
    <div className="input-field col">
        <select>
            <option {...props}/>
        </select>
    </div>
)

export default Selector