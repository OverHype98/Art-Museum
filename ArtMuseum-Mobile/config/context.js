import React, { Component, createContext } from "react";
import {  database, auth } from '../config/firebase'

export const UserContext = createContext( null);

class UserProvider extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        User: null,
    };
    _isMounted = false;

    componentDidMount = () => {
        this._isMounted = true;

        auth.onAuthStateChanged(userAuth => {
            if(userAuth != null)
            {
                let that = this;
                database.ref("/users/" + userAuth.uid).once('value').then(function(snapshot) {
                    const userData = snapshot.val();
                    userData["uid"] = userAuth.uid;

                    that.setState({ User: userData });
                });
            }


        });

    };

    componentWillUnmount() {
        this._isMounted = false;
    }



    setUser = ( firstName, lastName, avatar ) => {
        this.setState({
            User: {
                firstName: firstName,
                lastName: lastName,
                avatar: avatar,
            }
        })
    }



    render() {
        return (
            <UserContext.Provider value={{state: this.state, setUser: this.setUser}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;