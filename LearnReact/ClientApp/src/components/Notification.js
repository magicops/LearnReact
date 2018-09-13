import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = props => {

    if (!props.message)
        return '';

    return <Alert bsStyle={props.type || "danger"} className="notification" onDismiss={() => { props.onDismiss() }}>{props.message}</Alert>;
}

export default Notification;