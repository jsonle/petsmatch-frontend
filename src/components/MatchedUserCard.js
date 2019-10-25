import React from 'react';
import PetCard from './PetCard';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';

const MatchedUserCard = (props) => {
    console.log('matchedusercard props', props)
    return ( 
        <Card className='match-card'>
            <Card.Img variant="top" src={props.match.user_two.image.url} />
            <Card.Body>
                <Card.Title><h3>{props.match.user_two.name}</h3></Card.Title>
                <Card.Text>
                    Age: {props.match.user_two.age}<br></br>
                    {props.match.user_two.bio}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    <Container className="pet-list-container">
                        <Row className="pet-list-row">
                            {props.match.user_two.pets.map( (pet, index) => <PetCard pet={pet} key={index} />)}
                        </Row>
                    </Container>
                </ListGroup.Item>
            </ListGroup>
                
        </Card>
     );
}
 
export default MatchedUserCard;