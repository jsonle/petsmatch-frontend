import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck'

const PreferencesForm = (props) => {
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Please select your preferred pets:</Form.Label>
                    <Form.Check label="Dog" name="wants_dog" checked={props.currentPrefs.wants_dog} onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Cat" name="wants_cat" checked={props.currentPrefs.wants_cat} onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Fish" name="wants_fish" checked={props.currentPrefs.wants_fish} onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Bird" name="wants_bird" checked={props.currentPrefs.wants_bird} onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Reptile" name="wants_reptile" checked={props.currentPrefs.wants_reptile} onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Rodent" name="wants_rodent" checked={props.currentPrefs.wants_rodent} onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Exotic" name="wants_exotic" checked={props.currentPrefs.wants_exotic} onClick={props.handleCheckBoxClick} />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Please select your preferred gender:</Form.Label>
                    <Form.Check label="Male" name="wants_men" checked={props.currentPrefs.wants_men} onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Female" name="wants_women" checked={props.currentPrefs.wants_women} onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Non-binary" name="wants_non_binary" checked={props.currentPrefs.wants_non_binary} onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Other" name="wants_other" checked={props.currentPrefs.wants_other} onClick={props.handleCheckBoxClick} />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Please type in your preferred age range:</Form.Label>
                        <Form.Text className="text-muted">Minimum Age</Form.Text>
                    <Form.Control type="number" name="min_age" onChange={props.handlePreferencesChange} placeholder="Minimum age" value={props.currentPrefs.min_age}/>
                        <Form.Text className="text-muted">Maximum Age</Form.Text>
                    <Form.Control type="number" name="max_age" onChange={props.handlePreferencesChange} placeholder="Maximum age" value={props.currentPrefs.max_age}/>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col}>
                    <Button variant="primary" type="submit" onClick={props.handlePreferencesSave}>
                        Save preferences
                    </Button>
                    <Button variant="primary" type="submit" onClick={props.handleDoneClick}>
                        Done
                    </Button>
                </Form.Group>
            </Form.Row>
        </Form>
    );
}
 
export default PreferencesForm;