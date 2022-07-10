import React, { useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import adminloginimage from "./images/admin-login.webp"
import "./AdminLogin.css";

const AdminLogin= (props)=>{
    let navigate = useNavigate();
    
    const login = () =>{ 
        let path = '/Admin';
        navigate(path);
      }

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      function tryLogin() {
          // get data from mongodb

          const requestOptions = {
              method: 'POST',
          };

          fetch('http://localhost:3001/getAdminByEmail?email=' + email, requestOptions)
              .then(response => response.text())
              .then(result => {
                  result = JSON.parse(result)
                  if (result.password === password) {
                      console.log("Login successful")
                      login()
                  }
                  else {
                      console.log("Login unsuccessful")
                  }
              })
              .catch(error => console.log('Error: ', error));
      }

      let arrnames = ['cour1, 2, ']

  return (
        <div className="admin-login-base" style={{marginTop: 120}}>
            <div className="admin-login-content">
                <div className="admin-login-image">
                    <img src={adminloginimage} />
                </div>
                <div className="admin-login-form">
                    <div className="admin-login-form-group">
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
                    <div className="admin-login-form-group">
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

            <button className="admin-login-btn" onClick={login}>
                    <h4>Login</h4>                   
            </button>
        </div>
  );
}

export default AdminLogin;
