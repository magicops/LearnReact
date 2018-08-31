import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/CreateInspection';
import Slider from './Slider';
import { Lists } from '../constants';

class CreateInspection extends Component {
    componentWillMount() {
        this.props.loadAll();
    }

    render() {
        const lists = [
            {
                title: Lists.departments,
                items: this.props.departments
            },
            {
                title: Lists.rules,
                items: this.props.rules
            },
            {
                title: Lists.actions,
                items: this.props.actions
            },
            {
                title: Lists.stages,
                items: this.props.stages
            }
        ];

        return (
            <div className="create-inspection">
                {this.props.loading ? "Loading..." : <Slider lists={lists} />}
            </div>
        );
    }
}

export default connect(
    state => state.createInspection,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CreateInspection);