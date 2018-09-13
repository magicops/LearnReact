import React from 'react';

const ListView = props => {
    return <div>{
        props.list.map(item => <div key={item.id}>{item.title}</div>)
    }</div>;
};

export default ListView;