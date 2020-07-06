import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router";
import NavBar from "./Navigation";

class Layout extends Component {
    render() {
        return (
            <Fragment>
                {this.props.location.pathname !== '/login' && <NavBar />}
                <main>{this.props.children}</main>
            </Fragment>
        )
    }
}

export default withRouter(Layout)