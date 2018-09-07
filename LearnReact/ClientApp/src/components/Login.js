import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import { labels } from '../constants';
import { Alert, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Login';
import * as Auth from '../helpers/Auth';
import { PulseLoader } from 'react-spinners';


class Login extends Component {

    handleChange(e) {
        const { name, value } = e.target;
        this.props.changeField(name, value);
    }

    async handleSubmit(e) {
        e.preventDefault();

        const { username, password } = this.props;
        this.props.login(username, password);
    }

    render() {
        const { username, password, submitted, loading, error } = this.props;

        if (Auth.userIsAuthenticated())
            return <Redirect to='/form' />;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                {error &&
                    <Alert bsStyle="danger">{error}</Alert>
                }
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <FormGroup className={submitted && !username ? ' has-error' : ''}>
                        <ControlLabel htmlFor="username">{labels.username}</ControlLabel>
                        <FormControl type="text" name="username" value={username} onChange={(e) => this.handleChange(e)} />
                        {submitted && !username &&
                            <div className="help-block">{labels.usernameIsRequired}</div>
                        }
                    </FormGroup>
                    <FormGroup className={submitted && !password ? ' has-error' : ''}>
                        <ControlLabel htmlFor="password">{labels.password}</ControlLabel>
                        <input type="password" className="form-control" name="password" value={password} onChange={(e) => this.handleChange(e)} />
                        {submitted && !password &&
                            <div className="help-block">{labels.passwordIsRequired}</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <button
                            className="myButton btn btn-link"
                            disabled={loading}
                            onClick={loading ? (e) => { e.stopPropagation(); e.preventDefault(); return false; } : null}>
                            {loading ?
                                <PulseLoader
                                    size={5}
                                    margin="2px"
                                    color={'rgba(255,255,255,0.7)'}
                                    loading={loading}
                                />
                                : labels.login}
                        </button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

export default connect(
    state => state.login,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Login);