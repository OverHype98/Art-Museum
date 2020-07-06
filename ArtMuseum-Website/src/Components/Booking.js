import React, { useState, useEffect } from 'react';
import firebaseDb from '../firebase';
import BookingsForm from "./BookingsForm";

const Bookings = () => {
    var [bookings, setBookings] = useState({});
    var [currentId, setCurrentId] = useState('');

    useEffect(() => {
        firebaseDb.database().ref().child('bookings').on('value', (snapshot) => {
            if (snapshot.val() != null)
                setBookings({
                    ...snapshot.val(),
                });
            else setBookings({});
        });
    }, []); //same as componentDidMount

    const addOrEdit = (obj) => {
        if (currentId == '')
            firebaseDb.database().ref().child('bookings').push(obj, (err) => {
                if (err) console.log(err);
                else setCurrentId('');
            });
        else
            firebaseDb.database().ref().child(`bookings/${currentId}`).set(obj, (err) => {
                if (err) console.log(err);
                else setCurrentId('');
            });
    };

    const onDelete = (key) => {
        if (window.confirm('Are you sure to delete this Bookings Record?')) {
            firebaseDb.database().ref().child(`bookings/${key}`).remove((err) => {
                if (err) console.log(err);
                else setCurrentId('');
            });
        }
    };

    return (

        <React.Fragment>

            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Bookings</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <BookingsForm {...{ addOrEdit, currentId, artObjects: bookings }} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                        <tr>
                            <th>Date</th>

                            <th>Hour</th>
                            <th>Id</th>
                            <th>Uid</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(bookings).map((id) => {
                            return (
                                <tr key={id}>
                                    <td>{bookings[id].date}</td>

                                    <td>{bookings[id].hour}</td>
                                    <td>{bookings[id].id}</td>
                                    <td>{bookings[id].uid}</td>

                                    <td>
                                        <a
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setCurrentId(id);
                                            }}
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                        <a
                                            className="btn btn-danger"
                                            onClick={() => onDelete(id)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Bookings;
