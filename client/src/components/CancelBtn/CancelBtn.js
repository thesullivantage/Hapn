import React from "react";
import "./CancelBtn.css";
import Button from "react-materialize/lib/Button";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const CancelBtn = props => (
  <Button className="cancel-btn" {...props}>
    Cancel Event
  </Button>
);

export default CancelBtn;
