import React from 'react';
import { ListGroup, ListGroupItem, Glyphicon, Row, Col, Button } from 'react-bootstrap';

const ListView = props => {
    return <ListGroup>
        {
            props.list.map(item => <ListGroupItem key={item.id}>
                <Row>
                    <Col xs={8} md={10}>
                        {item.title}
                    </Col>
                    <Col xs={4} md={2} className="text-right">
                        <Button bsStyle="primary" className="btn-circle list-command" onClick={() => props.onUpdateItem(item.id, item.title)}>
                            <Glyphicon glyph='pencil' />
                        </Button>
                        <Button bsStyle="danger" className="btn-circle list-command" onClick={() => props.onDeleteItem(item.id)}>
                            <Glyphicon glyph='trash' />
                        </Button>
                    </Col>
                </Row>
            </ListGroupItem>)
        }
    </ListGroup>;
};

export default ListView;