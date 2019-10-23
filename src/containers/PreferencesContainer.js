import React, { Component } from 'react';
import PreferencesForm from '../components/PreferencesForm';

class PreferencesContainer extends Component {
    state = {
        min_age: "",
        max_age: "",
        wants_men: false,
        wants_women: false,
        wants_other: false,
        wants_non_binary: false,
        wants_dog: false,
        wants_cat: false,
        wants_fish: false,
        wants_bird: false,
        wants_reptile: false,
        wants_exotic: false,
        wants_rodent: false,
        // user_id: this.props.currentUser.id
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

    handlePreferencesSubmit = event => {
        event.preventDefault();
        this.props.onPreferencesSubmit(this.state);
        // this.props.history.push('/');
    }

    render() { 
        return (
            <div>
                <PreferencesForm 
                    handlePreferencesSubmit={this.handlePreferencesSubmit} 
                    handleCheckBoxClick={this.handleCheckBoxClick}
                    handlePreferencesChange={this.handlePreferenceChange}
                />
            </div>
        );
    }
}
 
export default PreferencesContainer;