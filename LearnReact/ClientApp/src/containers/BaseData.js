import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel, Row, Col, Modal, Button, Glyphicon } from 'react-bootstrap';
import { actionCreators } from '../store/Lists/actionCreators';
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

    getSelectedList() {
        switch (this.props.selectedList) {
            case Lists.departments:
                return this.props.departments;
            case Lists.rules:
                return this.props.rules;
            case Lists.procedures:
                return this.props.procedures;
            case Lists.actions:
                return this.props.actions;
            default:
                return null;
        }
    }

    handleSubmit() {
        const { itemId, itemTitle, selectedList } = this.props;

        this.props.submitItemTitle(itemId, itemTitle, selectedList, this.getSelectedList());
    }

    render() {
        
        let list = this.getSelectedList();

        if (this.props.loading)
            return <Loading loading={this.props.loading} />;

        return <div className="base-data">

            <Notification message={this.props.error} onDismiss={() => this.props.dismissError()} />

            <Modal show={this.props.deleteModal} onHide={() => this.props.hideDeleteModal()}>
                <Modal.Header bsStyle="danger" closeButton>
                    {labels.deleteModalTitle__.replace('__', this.props.selectedList)}
                </Modal.Header>
                <Modal.Body>
                    {labels.areYouSureToDelete}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.hideDeleteModal()}>{labels.cancel}</Button>
                    <Button bsStyle="danger" onClick={() => this.props.deleteItem(this.props.itemId, this.props.selectedList)}>{labels.ok}</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={this.props.showModal} onHide={() => this.props.hideModal()}>
                <Modal.Header>
                    {this.props.modalTitle}
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        type="text"
                        placeholder={labels.enterTitle}
                        value={this.props.itemTitle}
                        onChange={(e) => this.props.setItemTitle(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.hideModal()}>{labels.cancel}</Button>
                    <Button bsStyle="primary" onClick={() => this.handleSubmit()}>{labels.ok}</Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col sm={4}>
                    <FormGroup>
                        <ControlLabel>{labels.selectAList}</ControlLabel>
                        <Button bsStyle="success" className="pull-right add-item btn-circle" onClick={() => this.props.addNewItem()}>
                            <Glyphicon glyph='plus' />
                        </Button>
                    </FormGroup>
                    <FormGroup>
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
                onUpdateItem={(id, title) => this.props.updateItem(id, title)}
                onDeleteItem={id => this.props.showDeleteModal(id)}
            />
        </div>;
    }
}

export default connect(
    state => state.lists,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(BaseData);