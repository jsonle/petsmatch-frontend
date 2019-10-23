import React, { Component } from 'react';
import PreferencesForm from '../components/PreferencesForm';

class PreferencesContainer extends Component {

    state = {
        min_age: this.props.currentUser.preference.min_age || "",
        max_age: this.props.currentUser.preference.max_age || "",
        wants_men: this.props.currentUser.preference.wants_men,
        wants_women: this.props.currentUser.preference.wants_women,
        wants_other: this.props.currentUser.preference.wants_other,
        wants_non_binary: this.props.currentUser.preference.wants_non_binary,
        wants_dog: this.props.currentUser.preference.wants_dog,
        wants_cat: this.props.currentUser.preference.wants_cat,
        wants_fish: this.props.currentUser.preference.wants_fish,
        wants_bird: this.props.currentUser.preference.wants_bird,
        wants_reptile: this.props.currentUser.preference.wants_reptile,
        wants_exotic: this.props.currentUser.preference.wants_exotic,
        wants_rodent: this.props.currentUser.preference.wants_rodent,
        user_id: this.props.currentUser.id
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
        console.log(this.state)
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
 
export default PreferencesContainer;