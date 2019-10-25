import React from 'react';
import PetCard from './PetCard';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';

const MatchedUserCard = (props) => {
    if(props.match.user_two) {
        var matched_user = props.match.user_two
    } else {
        var matched_user = props.match.user_one
    }
    return ( 
        <Card className='match-card'>
            <Card.Img variant="top" src={matched_user.image.url} />
            <Card.Body>
                <Card.Title><h3>{matched_user.name}</h3></Card.Title>
                <Card.Text>
                    Age: {matched_user.age}<br></br>
                    {matched_user.bio}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    <Container className="pet-list-container">
                        <Row className="pet-list-row">
                            {matched_user.pets.map( (pet, index) => <PetCard pet={pet} key={index} />)}
                        </Row>
                    </Container>
                </ListGroup.Item>
            </ListGroup>
                
        </Card>
     );
}
 
export default MatchedUserCard;