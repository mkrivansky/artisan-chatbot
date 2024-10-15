import React, { useState } from "react";

type ResponseProps = {
	response: string;
}

function ResponseItem(props: ResponseProps) {
	return (
		<div>Ava: {props.response}</div>
	);
}

export default ResponseItem;