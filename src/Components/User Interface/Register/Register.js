import React, { useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import registerimage from "./images/register.svg"
import "./Register.css";

const Register= (props)=>{
    let navigate = useNavigate();
    
    const register = () =>{ 
        let path = '/Login'; 
        navigate(path);
      }

      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

    function tryRegister() {
        // get data from mongodb

        const requestOptions = {
            method: 'POST',
        };

        fetch('http://localhost:3001/addLearner?email=' + email + '&password=' + password + '&name=' + name, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                register()
            })
            .catch(error => console.log('Error: ', error));
    }

  return (
        <div className="register-base" style={{marginTop: 120}}>
            <div className="register-content">
                <div className="register-image">
                    <img src={registerimage} />
                </div>
                <div className="register-form">
                <div className="register-form-group">
                        <label htmlFor="name">Name</label>
                        <input onChange={function(event) {setName(event.target.value)}}
                            type="text" 
                            name="name" 
                            placeholder="Name"
                            required
                            value={name}    
                        />
                    </div>
                    
                    <div className="register-form-group">
                        <label htmlFor="username">Email Address</label>
                        <input onChange={function(event) {setEmail(event.target.value)}}
                            type="text" 
                            name="address" 
                            placeholder="Email" 
                            autoFocus 
                            required 
                            value={email} 
                        />

                    </div>
                    <div className="register-form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={function(event) {setPassword(event.target.value)}}
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            required
                            value={password}    
                        />
                    </div>
                </div>
            </div>

            <button className="register-btn" onClick={tryRegister}>
                    <h4>Register</h4>                   
            </button>
        </div>
  );
}

export default Register;
