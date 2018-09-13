import React from "react";
import "./EventLabel.css";

const EventLabel = props => {
  return (
    <h3>
        {props.text}
    </h3>
  );
};

export default EventLabel;