import React from "react";
import "./UserInvitedBtn.css";
import {Button} from "react-materialize";

const UserInvitedBtn = props => (
<Button className="invitees" id={props.value} {...props}>
{props.value}
</Button>
);

export default UserInvitedBtn;