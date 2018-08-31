import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Glyphicon, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Slider';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { labels } from '../constants';

class Slider extends Component {
    goNext() {
        this.props.next();
    }

    goPrev() {
        this.props.prev();
    }

    save(e) {
        e.preventDefault();

        let isValid = true,
            emptyListTitle = '';

        this.props.lists.forEach(l => {
            if (!this.props.selectedItems[l.title]) {
                isValid = false;
                emptyListTitle = l.title;
                return false;
            }
        });

        if (!isValid) {
            this.props.error(labels.select__List.replace('__', emptyListTitle));
            return;
        }

        this.props.error('');
        this.props.save(this.props.selectedItems);
    }

    isActive(step) {
        return this.props.step === step;
    }

    selectItem(list, id) {
        this.props.selectItem(list, id);
    }

    render() {

        const errorMessage = this.props.errorMessage ?
            <Alert bsStyle="danger" className="pull-left">{this.props.errorMessage}</Alert>
            : null;

        const lastStep = this.props.step === this.props.lists.length;

        return <div className="slider">

            <TransitionGroup className="slider-wrapper">
                {
                    this.props.lists.map((list, index) => (
                        this.isActive(index + 1) ?
                            <CSSTransition
                                classNames="step"
                                timeout={500}
                                key={index}>
                                <div className="step">
                                    <h3>{list.title}</h3>
                                    <ul>
                                        {
                                            list.items.map(item =>
                                                <li
                                                    className={this.props.selectedItems[list.title] === item.id ? "selected" : ""}
                                                    onClick={() => this.selectItem(list.title, item.id)}
                                                    key={item.id}
                                                    data-id={item.id}>
                                                    {item.title}
                                                </li>)
                                        }
                                    </ul>
                                </div>
                            </CSSTransition> : ""
                    ))
                }
            </TransitionGroup>

            <div className="clearfix" />
            <div className="footer">
                {
                    this.props.step === 1 ? "" :
                        <Button bsStyle="link" className="pull-right btn-slide" onClick={() => this.goPrev()}>
                            <Glyphicon glyph='chevron-right' /></Button>
                }
                {
                    lastStep ?
                        <Button className="pull-left" onClick={(e) => this.save(e)}>{labels.save}</Button>
                        :
                        <Button bsStyle="link" className="pull-left btn-slide" onClick={() => this.goNext()}>
                            <Glyphicon glyph='chevron-left' /></Button>
                }
                {lastStep ? errorMessage : ""}
                <div className="clearfix" />
            </div>
        </div>;
    }
}



export default connect(
    state => state.slider,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Slider);