import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel, Row, Col } from 'react-bootstrap';
import { actionCreators } from '../store/lists';
import Notification from '../components/Notification';
import ListView from '../components/ListView';
import Loading from '../components/Loading';
import { Lists, labels } from '../constants';

class BaseData extends Component {

    componentDidMount() {
        this.props.loadAll();
    }

    changeList(e) {
        this.props.changeSelectedList(e.target.value);
    }

    render() {

        let list = '';
        switch (this.props.selectedList) {
            case Lists.departments:
                list = this.props.departments;
                break;
            case Lists.rules:
                list = this.props.rules;
                break;
            case Lists.procedures:
                list = this.props.procedures;
                break;
            case Lists.actions:
                list = this.props.actions;
                break;
            default:
                break;
        }

        if (this.props.loading)
            return <Loading loading={this.props.loading} />;

        return <div className="base-data">

            <Notification message={this.props.error} onDismiss={() => this.props.onDismissError()} />
            <Row>
                <Col sm={4}>
                    <FormGroup>
                        <ControlLabel>{labels.selectAList}</ControlLabel>
                        <FormControl componentClass="select" onChange={(e) => this.changeList(e)}>
                            <option>{Lists.departments}</option>
                            <option>{Lists.rules}</option>
                            <option>{Lists.procedures}</option>
                            <option>{Lists.actions}</option>
                        </FormControl>
                    </FormGroup>
                </Col>
            </Row>

            <ListView
                list={list}
            />
        </div>;
    }
}

export default connect(
    state => state.lists,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(BaseData);