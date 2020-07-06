import React, { useState, useEffect } from 'react';

const ExhibitForm = (props) => {
    const initialFieldValues = {
        description: '',
        maxBookings: '',
        maxSpots: '',
        image: '',
        title: '',
        id: '',

    };

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    let [values, setValues] = useState(initialFieldValues);


    const uploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'dl3c9568n');
        setLoading(true);
        const res = await fetch(
            '	https://api.cloudinary.com/v1_1/dl3c9568n/image/upload',
            {
                method: 'POST',
                body: data
            }
        );

        const file = await res.json();
        console.log(file.url);

        setImage(file.url);
        setValues({
            ...values,
            ['image']: file.url,
        });
        setLoading(false)
    };

    useEffect(() => {
        if (props.currentId === '')
            setValues({
                ...initialFieldValues,
            });
        else
            setValues({
                ...props.exhibits[props.currentId],
            });
    }, [props.currentId, props.exhibits]);

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
                        <i className="fas fa-user"/>
                    </div>
                </div>
                <input
                    className="form-control"
                    placeholder="Title"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <textarea
                className="form-control"
                placeholder="Description"
                type="text"
                name="description"
                value={values.description}
                onChange={handleInputChange}
                />
            </div>

            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="far fa-user"/>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="User booking limit"
                        name="maxBookings"
                        value={values.maxBookings}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fab fa-cuttlefish"/>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="Max spots per hour"
                        name="maxSpots"
                        value={values.maxSpots}
                        onChange={handleInputChange}
                    />
                </div>
            </div>





            <h1>Upload Image</h1>
            <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
            />
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <img src={image} style={{ width: '100px' }} />
            )}

            <div className="form-group">
                <input
                    type="submit"
                    value={props.currentId === '' ? 'Save' : 'Update'}
                    className="btn btn-primary btn-block"
                />
            </div>
        </form>
    );
};

export default ExhibitForm;
