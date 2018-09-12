import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/lists';

class BaseData extends Component {

    componentDidMount() {
        this.props.loadAll();
    }

    render() {

        return <div className="base-data">BaseData
        </div>;
    }
}

export default connect(
    state => state.lists,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(BaseData);