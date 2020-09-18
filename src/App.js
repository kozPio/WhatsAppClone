import React from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Login from './Login';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {


  const user = useSelector(state => state.user)

  return (

    <div className="app">

      {!user ? (<Login />) : (
        <div className="app__body">

          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route >


              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>



        </div>

      )


      }

    </div>
  );
}

export default App;
