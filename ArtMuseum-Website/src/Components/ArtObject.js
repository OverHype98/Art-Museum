import React, { useState, useEffect } from 'react';
import ArtObjectForm from './ArtObjectForm';
import firebaseDb from '../firebase';

const ArtObject = () => {
  var [artObjects, setArtObjects] = useState({});
  var [currentId, setCurrentId] = useState('');

  useEffect(() => {
    firebaseDb.database().ref().child('object').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setArtObjects({
          ...snapshot.val(),
        });
      else setArtObjects({});
    });
  }, []); //same as componentDidMount

  const addOrEdit = (obj) => {
    if (currentId == '')
      firebaseDb.database().ref().child('object').push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId('');
      });
    else
      firebaseDb.database().ref().child(`object/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId('');
      });
  };

  const onDelete = (key) => {
    if (window.confirm('Are you sure to delete this Art Object Record?')) {
      firebaseDb.database().ref().child(`object/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId('');
      });
    }
  };

  return (

    <React.Fragment>

      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Art Objects</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ArtObjectForm {...{ addOrEdit, currentId, artObjects: artObjects }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Full Name</th>
                <th>Artist Info</th>
                <th>classification</th>
                <th>date</th>
                <th>dimensions</th>
                <th>medium</th>
                <th>Title</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(artObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td>{artObjects[id].artist}</td>
                    <td>{artObjects[id].artistInfo}</td>
                    <td>{artObjects[id].classification}</td>
                    <td>{artObjects[id].date}</td>
                    <td>{artObjects[id].dimensions}</td>
                    <td>{artObjects[id].medium}</td>
                    <td>{artObjects[id].title}</td>
                    <td><img
                        src={artObjects[id].image}
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

export default ArtObject;
