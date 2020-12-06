import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth"
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

function Login() {

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();

  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSingedIn : false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  
  const handleSingIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const singedInUser = {
        isSingedIn: true,
        name: displayName,
        email: email,
        photo: photoURL 
      }
      setUser(singedInUser)
      console.log(displayName, email, photoURL)
    })
    .catch(error => {
      var errorMessage = error.message;
      console.log(error)
    })
  }

  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
    .then(function(result) {
      
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log('fb user', user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  const handleSingOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const singedOutUser ={
        isSingedIn: false,
        name: "",
        email:'',
        photo:''
      }
      setUser(singedOutUser)
    })
  }

  const handleChange = (e) => {
    let isFormValid = true;

    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    } 
    if (e.target.name === 'pass') {
      const isPassValid = e.target.value.length > 6;
      const passHasNum = /\d{1}/.test(e.target.value);
      isFormValid = isPassValid && passHasNum;
    }
    if (isFormValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {

    if (newUser && user.email && user.pass) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.pass)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name)
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    if (!newUser) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.pass)
      .then(res =>{
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log('upadatted jjj', res.user)
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    e.preventDefault()
  }

  const updateUserName = name =>{
      const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
        })
        .then(function() {
        console.log('updatted successfully')
        }).catch(function(error) {
          console.log(error)
        });
      }

  return (
    <div style={{textAlign: 'center'}}>
        
        { 
          user.isSingedIn ? <button onClick={handleSingOut} style={{backgroundColor: "blue", color:"white", width:"200px"}}>Sing Out</button> :
          <button onClick={handleSingIn} style={{backgroundColor: "blue", color:"white", width:"200px"}}>Sing In</button>
        }
        <br/>
        <button onClick={handleFbSignIn}>Sign In using FB</button>
        {
          user.isSingedIn && <div>
            <p>Welcome {user.name}</p>
            <p>Your Email: {user.email}</p>
            <img src={user.photo} alt=""></img>
          </div>
        }
        <h1>Our Authentication system</h1>
        <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)}/>
        <label htmlFor="newUser">New User Registration</label>
       <form onSubmit={handleSubmit}>
         {newUser && <input type="text" name="name" onBlur={handleChange} placeholder="Name"/>}
         <br/>
         <input type="email" name="email" onBlur={handleChange} placeholder="Email"/>
         <br/>
         <input type="password" name="pass" onChange={handleChange} placeholder="Password"/>
         <br/>
         <input type="submit" value="submit"/>
       </form>
      <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green'}}>User {newUser ? 'created' : 'logged in'} successfully</p>
      }
    </div>
  );
}

export default Login;
