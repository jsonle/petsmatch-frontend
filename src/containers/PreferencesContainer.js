import React, { Component } from 'react';
import PreferencesForm from '../components/PreferencesForm';

class PreferencesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            min_age: props.currentUser.preference.min_age,
            max_age: props.currentUser.preference.max_age,
            wants_men: props.currentUser.preference.wants_men,
            wants_women: props.currentUser.preference.wants_women,
            wants_other: props.currentUser.preference.wants_other,
            wants_non_binary: props.currentUser.preference.wants_non_binary,
            wants_dog: props.currentUser.preference.wants_dog,
            wants_cat: props.currentUser.preference.wants_cat,
            wants_fish: props.currentUser.preference.wants_fish,
            wants_bird: props.currentUser.preference.wants_bird,
            wants_reptile: props.currentUser.preference.wants_reptile,
            wants_exotic: props.currentUser.preference.wants_exotic,
            wants_rodent: props.currentUser.preference.wants_rodent,
            user_id: props.currentUser.id
        }
    }

    handleCheckBoxClick = event => {
        this.setState({
            [event.target.name]: !this.state[event.target.name]
        })
    }

    handlePreferencesChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlePreferencesSave = event => {
        event.preventDefault();
        this.props.onPreferencesSubmit(this.state);
    }

    handleDoneClick = event => {
        event.preventDefault();
        this.props.history.push('/');
    }

    render() { 
        console.log(this.props.currentUser.preference)
        return (
            <div>
                <PreferencesForm 
                    handleDoneClick={this.handleDoneClick} 
                    handleCheckBoxClick={this.handleCheckBoxClick}
                    handlePreferencesChange={this.handlePreferencesChange}
                    handlePreferencesSave={this.handlePreferencesSave}
                    currentPrefs={this.state}
                />
            </div>
        );
    }
}

PreferencesContainer.defaultProps = {

}
 
export default PreferencesContainer;