import React from 'react';
import { Route } from "react-router-dom";
import ArtObject from './Components/ArtObject';
import Exhibit from "./Components/Exhibit";
import ExhibitArtObject from './Components/ExhibitArtObject';
import PrivateRoute from "./Components/PrivateRoute";
import { AuthProvider } from './Components/Auth';
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import HourSlots from "./Components/HourSlots";
import Bookings from "./Components/Booking";


function App() {
  return (

      <AuthProvider>


              <Layout>



                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                              <PrivateRoute exact path="/" component={ ArtObject }/>

                              <PrivateRoute exact path="/exhibit" component={ Exhibit }/>

                              <PrivateRoute exact path="/exhibitArtObject" component={ExhibitArtObject}/>

                              <PrivateRoute exact path="/hourSlots" component={ HourSlots }/>

                              <PrivateRoute exact path="/bookings" component={ Bookings }/>

                              <Route exact path="/login" component={ Login } />
                        </div>
                    </div>
              </Layout>

      </AuthProvider>

  );
}

export default App;
