import React, { useState, useEffect } from 'react';
import firebaseDb from '../firebase';
import ExhibitForm from "./ExhibitForm";

const Exhibit = () => {
    var [exhibits, setExhibits] = useState({});
    var [currentId, setCurrentId] = useState('');

    useEffect(() => {
        firebaseDb.database().ref().child('exhibition').on('value', (snapshot) => {
            if (snapshot.val() != null)
                setExhibits({
                    ...snapshot.val(),
                });
            else setExhibits({});
            console.log(snapshot.val())
        });
    }, []); //same as componentDidMount

    const addOrEdit = (obj) => {

        if (currentId === '')
        {
            let exhibitObj = firebaseDb.database().ref().child('exhibition').push(obj, (err) => {
                if (err) console.log(err);
                else setCurrentId('');
            });
            let iD = exhibitObj.key;
            obj["id"] = iD;
            firebaseDb.database().ref().child('exhibition').child(iD).set(obj);


        }
        else
        {
            firebaseDb.database().ref().child(`exhibition/${currentId}`).set(obj, (err) => {
                if (err) console.log(err);
                else setCurrentId('');
            });
        }

    };

    const onDelete = (key) => {
        if (window.confirm('Are you sure to delete this Exhibit Record?')) {
            firebaseDb.database().ref().child(`exhibition/${key}`).remove((err) => {
                if (err) console.log(err);
                else setCurrentId('');
            });
        }
    };

    return (
        <React.Fragment>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Exhibits</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ExhibitForm {...{ addOrEdit, currentId, exhibits: exhibits }} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>MaxUserBookings</th>
                            <th>MaxSpots/Hour</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(exhibits).map((id) => {
                            return (
                                <tr key={id}>
                                    <td>{exhibits[id].id}</td>
                                    <td>{exhibits[id].title}</td>
                                    <td>{exhibits[id].description}</td>
                                    <td>{exhibits[id].maxBookings}</td>
                                    <td>{exhibits[id].maxSpots}</td>
                                    <td><img
                                        src={exhibits[id].image}
                                        alt="new"
                                        height={150}
                                        width={150}
                                    /></td>
                                    <td>
                                        <a
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setCurrentId(id);
                                            }}
                                        >
                                            <i className="fas fa-pencil-alt"/>
                                        </a>
                                        <a
                                            className="btn btn-danger"
                                            onClick={() => onDelete(id)}
                                        >
                                            <i className="fas fa-trash-alt"/>
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

export default Exhibit;
