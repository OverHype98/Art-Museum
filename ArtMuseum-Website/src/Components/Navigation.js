import React  from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import fireDb from "../firebase";
import Button from 'react-bootstrap/Button';



const NavBar = () => {
    return(
        <div className="App">
            <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="danger" variant="dark">
                <ReactBootStrap.Navbar.Brand href="#home">Art Museum Admin</ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto">
                        <Link to="/">
                            <ReactBootStrap.Nav.Link href="#artObjects">Art Objects</ReactBootStrap.Nav.Link>
                        </Link>
                        <Link to="/exhibit">
                            <ReactBootStrap.Nav.Link href="#exhibit">Exhibit</ReactBootStrap.Nav.Link>
                        </Link>
                        <Link to="/exhibitArtObject">
                            <ReactBootStrap.Nav.Link href="#exhibitArtObject">Exhibit Art Object</ReactBootStrap.Nav.Link>
                        </Link>
                        <Link to="/hourSlots">
                            <ReactBootStrap.Nav.Link href="#hourSlots">Hour Slots</ReactBootStrap.Nav.Link>
                        </Link>
                        <Link to="/bookings">
                            <ReactBootStrap.Nav.Link href="#bookings">Bookings</ReactBootStrap.Nav.Link>
                        </Link>
                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Nav>
                        <Button variant="danger" onClick={() => fireDb.auth().signOut()}>Sign out</Button>
                    </ReactBootStrap.Nav>
                </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;