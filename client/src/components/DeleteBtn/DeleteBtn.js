import React from "react";
import "./DeleteBtn.css";
import Button from "react-materialize/lib/Button";

const DeleteBtn = props => (
  <Button className="delete-btn" id = {props.data} {...props}>
    Decline
  </Button>
);

export default DeleteBtn;
