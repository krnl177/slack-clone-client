import React, { useState } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
export default function Register() {
    const initialState = {
        username: '',
        password: '',
        email: ''
    }
    const [userData, setUserData] = useState(initialState)
    const [formErrors, setFormErrors] = useState([])
    const onChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const [onSubmit, { data }] = useMutation(REGISTRATION_MUTATION, {
        variables: userData,
        update(_, result) {
            setUserData(initialState)
        },
        onError(e) {
        },
        onCompleted(result) {
            setFormErrors([])
            console.log('result=====', result);
            const { register: { ok, errors } } = result;
            console.log('ok=====', ok);
            if (ok) {
                setFormErrors([])
            }
            if (!ok) {
                console.log('err--------', errors);
                for (const erroInfo of errors) {
                    const { path, message } = erroInfo
                    setFormErrors(oldError => [...oldError, message])
                }
                console.log('err final--------', formErrors);
            }
        }
    });

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={userData.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={userData.password}
                    onChange={onChange}
                />

                <Button type="submit" primary>
                    Register
                </Button>
                {/* {
                    formErrors.length > 0 && (
                        <Message
                            error
                            header='Could you check something!'
                            list={formErrors}
                        />
                    )
                } */}
            </Form>
            {formErrors.length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {formErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}


const REGISTRATION_MUTATION = gql`
    mutation register(
        $username: String!
        $password: String!
        $email: String!
    ) {
        register(
            username:$username,
            email:$email,
            password:$password
        ) {
            ok
            errors {
                path
                message
            }
        }
    }
`