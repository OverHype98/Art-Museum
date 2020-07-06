import React, { Component } from "react";
import firebase from "../firebase";



 class ExhibitArtObject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            exhibitList: [],
            artObjectList: [],


        };


        this.handleInputChangeExhibit= this.handleInputChangeExhibit.bind(this);
        this.handleInputChangeObject= this.handleInputChangeObject.bind(this);

    }

    componentDidMount() {
        console.log("Connecting to firebase");

        this.makeRequest();
    }

    makeRequest() {
        //Get the data from exhibition table
        let ref = firebase.database().ref('exhibition');

        //store content of the db into an array to be used to set the state later
        const exhibitionListTemp = [];

        ref.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                console.log( childSnapshot.key + " : "  + childSnapshot.val());

                const item = {
                    id: childSnapshot.key,
                    title: childSnapshot.val().title,
                    image: childSnapshot.val().image,
                    description: childSnapshot.val().description,
                    checked: false,
                };
                exhibitionListTemp.push(item);
            })
            this.setState({exhibitList: exhibitionListTemp })
        })

        //get the data from art object table
        ref = firebase.database().ref('object');

        const objectListTemp = [];

        ref.on('value', snapshot => {
            snapshot.forEach( childSnapshot => {

                const item = {
                    id: childSnapshot.key,
                    title: childSnapshot.val().title,
                    artist: childSnapshot.val().artist,
                    image: childSnapshot.val().image,
                    checked: false,
                }

                objectListTemp.push(item);
            })
            this.setState({artObjectList: objectListTemp ,isLoading:false})
        })


    }





     handleInputChangeExhibit(event) {
        console.log( "value: " + event.target.value + " checked: " + event.target.checked);

         //search list for the id number, if there is a match set checked variable
         for (const each of this.state.exhibitList) {
             if (event.target.value == each.id)
                 each.checked = event.target.checked;
         }

         this.setState({ exhibitList: this.state.exhibitList });
     }
     handleInputChangeObject(event) {
         console.log( "value: " + event.target.value + " checked: " + event.target.checked);

         //search list for the id number, if there is a match set checked variable
         for (const each of this.state.artObjectList) {
             if (event.target.value == each.id)
                 each.checked = event.target.checked;
         }

         this.setState({ artObjectList: this.state.artObjectList });
     }

     saveChecked() {
        let exhibit = {};
        let objectLists = [];

        for(const it of this.state.exhibitList) {
            if(it.checked === true) {
                exhibit = it;
            }
        }

        for(const it of this.state.artObjectList) {
            if(it.checked === true) {
                let item = {
                    [it.id]: true,
                };

                objectLists.push(item);
            }
        }

        console.log(Object.values(objectLists))
        let ref = firebase.database().ref('exhibition_object').child(exhibit.id);
        ref.set([]);


        for(const it of objectLists) {
            ref.update(it);
        }


     }





    render() {
        //when data is being loaded
        if (this.state.isLoading) {
            return <div>loading...</div>;
        }

        //when the data is loaded, then do the following
        return (
            <React.Fragment>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4 text-center">Exhibit Art Object</h1>
                    </div>
                </div>
            <div className="row">
                <div className="col-md-5">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                        <tr>
                            <th>checked</th>

                            <th>Title</th>
                            <th>image</th>

                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(this.state.exhibitList).map((id) => {
                            return (
                                <tr key={id}>
                                    <td><input
                                        type="checkbox"
                                        value={this.state.exhibitList[id].id}
                                        onChange={this.handleInputChangeExhibit}
                                        checked={this.state.exhibitList[id].checked}
                                    /></td>

                                    <td>{this.state.exhibitList[id].title}</td>

                                    <td><img
                                        src={this.state.exhibitList[id].image}
                                        alt="new"
                                        height={150}
                                        width={150}
                                    /></td>

                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                        <tr>
                            <th>checked</th>

                            <th>Title</th>
                            <th>image</th>

                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(this.state.artObjectList).map((id) => {
                            return (
                                <tr key={id}>
                                    <td><input
                                        type="checkbox"
                                        value={this.state.artObjectList[id].id}
                                        onChange={this.handleInputChangeObject}
                                        checked={this.state.artObjectList[id].checked}
                                    /></td>

                                    <td>{this.state.artObjectList[id].title}</td>

                                    <td><img
                                        src={this.state.artObjectList[id].image}
                                        alt="new"
                                        height={150}
                                        width={150}
                                    /></td>

                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                <a
                    className="btn btn-danger"
                    onClick={() => this.saveChecked()}
                >
                    <i className="fas fa-save fa-5x"></i>
                </a>

            </div>
            </React.Fragment>

        );
    }
}
export default ExhibitArtObject;
