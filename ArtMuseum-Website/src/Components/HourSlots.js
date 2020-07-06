import React, { useState, useEffect } from 'react';
import firebaseDb from '../firebase';
import ExhibitForm from "./ExhibitForm";
import HourSlotsForm from "./HourSlotsForm";





function guidGenerator() {
    /**
     * @return {string}
     */
    let S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4());
}

const HourSlots = () => {
    var [hourSlots, setHourSlots] = useState({});
    var [currentId, setCurrentId] = useState('');

    useEffect(() => {
        firebaseDb.database().ref().child('hour_slots').on('value', (snapshot) => {
            if (snapshot.val() != null)
                setHourSlots({
                    ...snapshot.val(),
                });
            else setHourSlots({});



        });
    }, []); //same as componentDidMount

    const addOrEdit = (obj) => {
        let id = guidGenerator();
        let length = Object.keys(hourSlots).length-1;

        let temp =Object.keys(hourSlots)[length];//temp last slot




        if (currentId == '')
        {
            hourSlots[id] = obj.slots;
            firebaseDb.database().ref().child('hour_slots').set(hourSlots, (err) => {
                if (err) console.log(err);
                else setCurrentId('');
            });
        }
        else
        {

            hourSlots[currentId] = obj.slots;

            firebaseDb.database().ref().child(`hour_slots`).set(hourSlots, (err) => {
                if (err) console.log(err);
                else setCurrentId('');
            });
        }   

    };

    const onDelete = (key) => {
        if (window.confirm('Are you sure to delete this HourSlot Record?')) {
            firebaseDb.database().ref().child(`hour_slots/${key}`).remove((err) => {
                if (err) console.log(err);
                else setCurrentId('');
            });
        }
    };

    return (
        <React.Fragment>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Hour Slots</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <HourSlotsForm {...{ addOrEdit, currentId, hourSlots: hourSlots }} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                        <tr>

                            <th>Id</th>
                            <th>Hour</th>

                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(hourSlots).map((id) => {

                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{hourSlots[id]}</td>
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

export default HourSlots;
