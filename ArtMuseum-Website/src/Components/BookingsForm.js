import React, { useState, useEffect } from 'react';

const BookingsForm = (props) => {
    const initialFieldValues = {
        date: '',
        exhibitId: '',
        hour: '',
        id: '',
        uid: '',
    };


    const [loading, setLoading] = useState(false)
    let [values, setValues] = useState(initialFieldValues);


    useEffect(() => {
        if (props.currentId == '')
            setValues({
                ...initialFieldValues,
            });
        else
            setValues({
                ...props.artObjects[props.currentId],
            });
    }, [props.currentId, props.artObjects]);

    const handleInputChange = (e) => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.addOrEdit(values);
    };

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-calendar-day"></i>
                    </div>
                </div>
                <input
                    className="form-control"
                    placeholder="Date"
                    type="text"
                    name="date"
                    value={values.date}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-id-card-alt"></i>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="ExhibitId"
                        name="exhibitId"
                        value={values.exhibitId}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fab fa-cuttlefish"></i>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="Hour"
                        name="hour"
                        value={values.hour}
                        onChange={handleInputChange}
                    />
                </div>
            </div>


            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-id-card-alt"></i>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="Id"
                        name="id"
                        value={values.id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-id-card-alt"></i>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="Uid"
                        name="uid"
                        value={values.uid}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-group">
                <input
                    type="submit"
                    value={props.currentId == '' ? 'Save' : 'Update'}
                    className="btn btn-primary btn-block"
                />
            </div>
        </form>
    );
};

export default BookingsForm;
