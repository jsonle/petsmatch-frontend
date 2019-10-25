import React, { Component } from 'react';
import PreferencesForm from '../components/PreferencesForm';
import Alert from 'react-bootstrap/Alert'

class PreferencesContainer extends Component {

    state = {
        prefData : {
            min_age: this.props.currentUser.preference.min_age,
            max_age: this.props.currentUser.preference.max_age,
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
        },
        savePrefAlert: false

    }
    

    handleCheckBoxClick = event => {
        this.setState({
            prefData: {...this.state.prefData, [event.target.name]: !this.state.prefData[event.target.name]}
        })
    }

    handlePreferencesChange = event => {
        this.setState({
            prefData: {...this.state.prefData, [event.target.name]: event.target.value}
        })
    }

    handlePreferencesSave = event => {
        event.preventDefault();
        this.props.onPreferencesSubmit(this.state.prefData);
        this.setState({
            savePrefAlert: true
        })
    }

    handleDoneClick = event => {
        event.preventDefault();
        this.props.history.push('/profile');
    }

    render() { 
        console.log(this.state.prefData)
        return (
            <div>
                <Alert variant="primary" show={this.state.savePrefAlert} onClose={() => this.setState({savePrefAlert: false})} dismissible>Successfully saved your preferences!</Alert>
                <PreferencesForm 
                    handleDoneClick={this.handleDoneClick} 
                    handleCheckBoxClick={this.handleCheckBoxClick}
                    handlePreferencesChange={this.handlePreferencesChange}
                    handlePreferencesSave={this.handlePreferencesSave}
                    currentPrefs={this.state.prefData}
                />
            </div>
        );
    }
}
 
export default PreferencesContainer;