import React from "react";
import "./AddEventBtn.css";
import {Button} from "react-materialize";

const AddEventBtn = props => (
<Button className="add-btn" {...props}>
Add Event
</Button>
);

export default AddEventBtn;