import React from 'react';
import { Glyphicon, Button, ListGroup, ListGroupItem, FormGroup, ControlLabel } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { labels } from '../constants';
import Notification from './Notification';
import localization from '../helpers/localization';
import DatePicker from 'react-datepicker2';
import 'react-datepicker2/dist/react-datepicker2.min.css';
//import moment from 'moment-jalaali';

class Slider extends React.Component {
    
    datePicker = null;

    componentDidMount() {

        if (this.datePicker) {
            //console.log(this.datePicker);
            //console.log(this.datePicker.getValue());
            //this.props.onDateChange(this.datePicker.getValue());
            this.datePicker.setOpen(true);
        }
    }

    render() {

        const props = this.props;

        const lastStep = props.step === props.lists.length + 1;

        const prevButton = <Button
            bsStyle="link"
            className="pull-right btn-slide"
            onClick={() => props.onPrev()}>
            <Glyphicon glyph='chevron-right' />
        </Button>;

        const nextButton = <Button
            bsStyle="link"
            className="pull-left btn-slide"
            onClick={() => props.onNext()}>
            <Glyphicon glyph='chevron-left' />
        </Button>;

        const saveButton = <Button
            bsStyle="link"
            className="pull-left"
            onClick={(e) => { e.preventDefault(); props.onSave(props.lists, props.selectedItems); }}>
            {labels.save}
        </Button>;

        const generateSlide = (list) => {
            return <div className="step">
                <h3>{list.title}</h3>
                <ListGroup>
                    {
                        list.items.map(item =>
                            <ListGroupItem
                                active={props.selectedItems[list.title] === item.id}
                                onClick={() => props.onSelectItem(list.title, item.id)}
                                key={item.id}>
                                {item.title}
                            </ListGroupItem>)
                    }
                </ListGroup>
            </div>;
        };


        return <div className="slider">
            <Notification message={props.error} onDismiss={() => props.onDismissError()} />

            <TransitionGroup className="slider-wrapper">
                {props.step === 1 ?
                    <CSSTransition
                        classNames="step"
                        timeout={500}>
                        <FormGroup style={{ textAlign: 'center' }}>
                            <ControlLabel>{labels.selectDate}</ControlLabel>
                            <DatePicker
                                isGregorian={!localization.isRTL()}
                                timePicker={false}
                                value={props.selectedDate}
                                onChange={value => props.onDateChange(value)}
                                ref={d => this.datePicker = d}
                            />
                        </FormGroup>
                    </CSSTransition>
                    :
                    props.lists.map((list, index) => (
                        props.step === index + 2 ?
                            <CSSTransition
                                classNames="step"
                                timeout={500}
                                key={index}>
                                {generateSlide(list)}
                            </CSSTransition> : ""
                    ))
                }
            </TransitionGroup>

            <div className="clearfix"></div>
            <div className="footer">
                {props.step !== 1 && prevButton}
                {lastStep ? saveButton : nextButton}
                <div className="clearfix"></div>
            </div>
        </div >;
    }
}

export default Slider;