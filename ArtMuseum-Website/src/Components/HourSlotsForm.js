import React, { useState, useEffect } from 'react';


const HourSlotsForm = (props) => {
    const initialFieldValues = {
        slots:'',

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
                ...props.hourSlots[props.currentId],
            });
    }, [props.currentId, props.hourSlots]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;

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
                        <i className="fas fa-hourglass-start"></i>
                    </div>
                </div>
                <input
                    className="form-control"
                    placeholder="11:00am to 12:00pm"
                    type="text"
                    name="slots"
                    value={values.slots}
                    onChange={handleInputChange}
                />
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

export default HourSlotsForm;
