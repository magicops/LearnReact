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
        return (
            <div>
                {this.props.loading ? "Loading..." :
                    <Slider lists={
                        [
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
                        ]
                    } />
                }
                {this.props.selectedDepartment}
                <br />
                {this.props.selectedRule}
                <br />
                {this.props.selectedAction}
                <br />
                {this.props.selectedStage}
                <br />
                <button onClick={() => {
                    this.props.loading ?
                        this.props.hideLoading() :
                        this.props.showLoading();
                }}>Next</button>
            </div >
        );
    }
}

export default connect(
    state => state.createInspection,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CreateInspection);