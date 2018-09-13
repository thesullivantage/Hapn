import React from "react";
import "./UnacceptBtn.css";
import { Button } from "react-materialize";

const UnacceptBtn = props => (
	<Button className="unaccept-btn" {...props}>
		Unaccept
	</Button>
);

export default UnacceptBtn;