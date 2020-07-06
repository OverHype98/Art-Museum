import React, { useState, useEffect } from 'react';

const ArtObjectForm = (props) => {
  const initialFieldValues = {
    artist: '',
    artistInfo: '',
    classification: '',
    date: '',
    dimensions: '',
    image: '',
    medium: '',
    title: '',

  };

  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  let [values, setValues] = useState(initialFieldValues);


  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'dl3c9568n')
    setLoading(true)
    const res = await fetch(
        '	https://api.cloudinary.com/v1_1/dl3c9568n/image/upload',
        {
          method: 'POST',
          body: data
        }
    )

    const file = await res.json()
    console.log(file.url)

    setImage(file.url)
    setValues({
      ...values,
      ['image']: file.url,
    });
    setLoading(false)
  }

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
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          className="form-control"
          placeholder="Full Name"
          type="text"
          name="artist"
          value={values.artist}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-info"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Artist Information"
            name="artistInfo"
            value={values.artistInfo}
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
            placeholder="Classification"
            name="classification"

            value={values.classification}
            onChange={handleInputChange}
          />
        </div>
      </div>


      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-calendar-day"></i>
            </div>
          </div>
          <input
              className="form-control"
              placeholder="Date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-ruler-vertical"></i>
            </div>
          </div>
          <input
              className="form-control"
              placeholder="Dimensions"
              name="dimensions"
              value={values.dimensions}
              onChange={handleInputChange}
          />
        </div>
      </div>


      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fab fa-medium"></i>
            </div>
          </div>
          <input
              className="form-control"
              placeholder="Medium"
              name="medium"
              value={values.medium}
              onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-signature"></i>
            </div>
          </div>
          <input
              className="form-control"
              placeholder="Title"
              name="title"
              value={values.title}
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
          value={props.currentId == '' ? 'Save' : 'Update'}
          className="btn btn-primary btn-block"
        ></input>
      </div>
    </form>
  );
};

export default ArtObjectForm;
