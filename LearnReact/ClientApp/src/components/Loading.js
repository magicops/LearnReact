import React from 'react';
import { PulseLoader } from 'react-spinners';


const Loading = props => (<PulseLoader
    className={props.noClass ? "" : "loading" }
    size={props.size || 15}
    margin={props.margin || "5px"}
    color={props.color || '#4A90E2'}
    loading={props.loading}
/>);

export default Loading;