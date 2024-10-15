import React, { useState } from "react";

type MessageProps = {
	message: string;
}

function MessageItem(props: MessageProps) {
	return (
		<div>User: {props.message}</div>
	);
}

export default MessageItem;