import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Glyphicon, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Slider';

class Slider extends Component {
    goNext() {
        this.props.next();
    }

    goPrev() {
        this.props.prev();
    }

    isActive(step) {
        return this.props.step === step ? "active" : "";
    }

    selectItem(list, id) {
        this.props.selectItem(list, id);
    }

    render() {
        return <div className="slider">

            <ul>
                {
                    this.props.lists.map((list, index) =>
                        <li key={index} className={this.isActive(index + 1)}>
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
                        </li>
                    )
                }
            </ul>
            <div className="clearfix" />
            <div>
                {
                    this.props.step === 1 ? "" :
                        <Button className="pull-right" onClick={() => this.goPrev()}>
                            <Glyphicon glyph='chevron-right' /></Button>
                }
                {
                    this.props.step === this.props.lists.length ? "" :
                        <Button className="pull-left" onClick={() => this.goNext()}>
                            <Glyphicon glyph='chevron-left' /></Button>
                }
                <div className="clearfix" />
            </div>
        </div>;
    }
}



export default connect(
    state => state.slider,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Slider);