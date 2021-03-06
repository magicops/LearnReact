﻿import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { actionCreators } from '../store/Lists/actionCreators';
import Slider from '../components/Slider';
import Loading from '../components/Loading';
import { Lists, labels } from '../constants';
import localization from '../helpers/localization';
import momentJalaali from 'moment-jalaali';
import moment from 'moment';

momentJalaali.loadPersian();

class CreateInspection extends Component {
    componentWillMount() {
        this.props.loadAll();
    }

    render() {

        if (this.props.loading)
            return <Loading loading={this.props.loading} />;

        let output = "";

        if (this.props.saved)
            output = <div className="success-result">
                <Alert bsStyle="success">{labels.saveSuccessful}</Alert>
                <Button
                    bsStyle="primary"
                    onClick={() => { this.props.reset() }}>{labels.resetForm}</Button>
            </div>;
        else {

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

            output = <Slider
                rtl={this.props.rtl}
                step={this.props.step}
                selectedItems={this.props.selectedItems}
                selectedDate={this.props.selectedDate || (localization.isRTL() ? new momentJalaali() : new moment())}
                error={this.props.error}
                lists={lists}
                onSave={(lists, selectedItems) => this.props.save(lists, selectedItems, this.props.selectedDate)}
                onSelectItem={(list, id) => this.props.selectItem(list, id)}
                onNext={() => this.props.sliderNext()}
                onPrev={() => this.props.sliderPrev()}
                onDateChange={date => this.props.sliderSelectDate(date)}
                onDismissError={() => { this.props.dismissError() }}
            />;
        }

        return <div className="create-inspection">{output}</div>;
    }
}

export default connect(
    state => state.lists,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CreateInspection);