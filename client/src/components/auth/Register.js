import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../../store/actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        private: false,
        errors: {}
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }
    componentWillReceiveProps = nextProps => {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/find-person');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleFormSubmit = e => {
        e.preventDefault();

        const userData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            private: this.state.private
        }
        this.props.registerUser(userData, this.props.history);
    };
    render() {

        const { errors } = this.state;

        return (
            <div className="split-screen-sect">
                <div className="split-screen-lhs">
                    <div className="hp-sect-title">Elegance</div>
                    <div className="hp-sect-subtitle">Create the right atmosphere for the occassion</div>
                    <ul className="hp-sect-content">
                        <li>Bellevoye bears the name of a road, the least traveled by, a path that one barely sees and that carries the promise of dawn, a destination shaped like a dream.</li>
                        <li>Jean and Alexandre designed this dream, placing their faith at the very heart of it, faith in the strength of their culture and country, France.</li>
                        <li>They have made this dream come true with a crazy and audacious bet. It was born from a will to create, innovate, and push the boundaries: producing a great French whisky, with all of our skills and know-how, our terroirs and our raw materials.</li>
                        <li>They have built this dream though strong values and the wish to establish a virtuous circle around their whisky, from suppliers to partners through retailers and customers.</li>
                        <li>Some stories are meant to be told, dreams must become true, otherwise they are doomed to remain no more than beautiful ideas.</li>
                    </ul>
                </div>
                <div className="split-screen-rhs">

                    <form onSubmit={this.handleFormSubmit}>
                        <TextFieldGroup 
                         type="text"
                         name="firstname"
                         placeholder="First Name"
                         onChange={this.handleInputChange}
                         error={errors.firstname}
                        />
                        <TextFieldGroup 
                         type="text"
                         name="lastname"
                         placeholder="Last Name"
                         onChange={this.handleInputChange}
                         error={errors.lastname}
                        />
                        <TextFieldGroup 
                         type="email"
                         name="email"
                         placeholder="Email Address"
                         onChange={this.handleInputChange}
                         error={errors.email}
                        />
                        <TextFieldGroup 
                         type="text"
                         name="phone"
                         placeholder="Phone Number"
                         onChange={this.handleInputChange}
                         error={errors.phone}
                        />
                        <TextFieldGroup 
                         type="password"
                         name="password"
                         placeholder="Password"
                         onChange={this.handleInputChange}
                         error={errors.password}
                        />
                        <TextFieldGroup 
                         type="password"
                         name="confirmPassword"
                         placeholder="Confirm Password"
                         onChange={this.handleInputChange}
                         error={errors.confirmPassword}
                        />
                        <label htmlFor="private">Private</label>
                        <input
                            type="checkbox"
                            name="private"
                            className="site-input"
                            onChange={this.handleInputChange}
                        />
                        {errors.private && (<div className="invalid-feedback">{errors.private}</div>)}
                        <button className="btn btn-x2 btn-default">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth, //note that state.auth comes from the rootReducer
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register))