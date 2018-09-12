import React from 'react';
import { PulseLoader } from 'react-spinners';


const Loading = props => (<PulseLoader
    className="loading"
    size={props.size || 15}
    margin={props.margin || "5px"}
    color={'rgba(255,255,255,0.7)'}
    loading={props.loading}
/>);

export default Loading;