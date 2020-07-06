import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import fireDb from "../firebase";
import { AuthContext } from "./Auth.js";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await fireDb
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);

            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);



    if (currentUser) {
        fireDb.database().ref('users').child(currentUser.uid).on('value', (snapshot) => {
            let user = snapshot.val();
            if(user.role === 'admin')
            {
                history.push("/");
                return <Redirect to="/" />;
            }else
            {
                fireDb.auth().signOut()
                alert('You are not authorized !')
            }
        })
    }

    const styles= {
        myComponent: {
            fontSize: 200,

        },
    };

    return (
        <div
            style={{
                position: 'absolute', left: '30%', top: '30%',width:1000,
                transform: 'translate(-20%, +70%)'
            }}
        >

                <form  onSubmit={handleLogin}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" className="form-control" placeholder="Enter password" />
                    </div>


                    <button type="submit" className="btn btn-primary btn-block">Login</button>

                </form>
        </div>
    );
};

export default withRouter(Login);


