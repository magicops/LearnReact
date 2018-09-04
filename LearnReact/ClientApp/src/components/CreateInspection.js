import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Well } from 'react-bootstrap';
import { actionCreators } from '../store/CreateInspection';
import Slider from './Slider';
import { PulseLoader } from 'react-spinners';
import { Lists, labels } from '../constants';

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
                title: Lists.procedures,
                items: this.props.procedures
            },
            {
                title: Lists.actions,
                items: this.props.actions
            }
        ];

        let output = "";

        if (this.props.loading)
            output = <PulseLoader
                className="loading"
                size={15}
                margin="5px"
                color={'rgba(255,255,255,0.7)'}
                loading={this.props.loading}
            />;
        else if (this.props.saved)
            output = <div className="success-result">
                <Well bsStyle="success">{labels.saveSuccessful}</Well>
                <Button
                    bsStyle="link"
                    className="myButton"
                    onClick={() => { this.props.reset() }}>{labels.resetForm}</Button>
            </div>;
        else
            output = <Slider
                step={this.props.step}
                selectedItems={this.props.selectedItems}
                error={this.props.error}
                lists={lists}
                onSave={(lists, selectedItems) => this.props.save(lists, selectedItems)}
                onSelectItem={(list, id) => this.props.selectItem(list, id)}
                onNext={() => this.props.sliderNext()}
                onPrev={() => this.props.sliderPrev()}
            />;

        return <div className="create-inspection">{output}</div>;
    }
}

export default connect(
    state => state.createInspection,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CreateInspection);