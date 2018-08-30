import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/TestForm';

class TestForm extends Component {
    componentWillMount() {
        this.props.load();
    }

    render() {
        return (
            <div>
                {this.props.test}
                <pre>
                    {JSON.stringify(this.props.rules, null, 2)}
                </pre>
                <button onClick={this.props.run}>Run</button>
            </div>
        );
    }
}

export default connect(
    state => state.test,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(TestForm);