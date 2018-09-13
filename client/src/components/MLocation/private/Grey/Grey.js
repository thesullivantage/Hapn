import React from "react";
import "./Grey.css";
import { Button, Collection, CollectionItem } from "react-materialize";

const Grey = props => (
	<Collection className="gray">
		<CollectionItem className="center-align">
			<h4>You Already Accessed this Location</h4>
		</CollectionItem>
	</Collection>
);

export default Grey;