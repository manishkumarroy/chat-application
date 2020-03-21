import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { backendURL } from "../config";
import axios from "axios";
import { connect } from "react-redux";
import { setUserDetails } from '../actions/userAction'

function Login(props) {
    const [userCheckState, setStateUserCheck] = useState(false);

    if (userCheckState) {

        return (
            <Redirect
                push
                to={{
                    pathname: "/chat",
                }}
            />
        );
    } else
        return (
            <div className=" m-auto p-2 mt-4" style={{ width: "60%" }}>
                <div className="card p-3 mt-4">
                    <h1 className="text-secondary">VChat</h1>
                    <hr />
                    <h3>Login</h3>
                    <hr />
                    <form className="form-group" method="/user/register">
                        <input
                            type="text"
                            className="my-1 form-control email"
                            placeholder="Email"
                            name="email"
                        />
                        <input
                            type="text"
                            className="my-1 form-control password"
                            placeholder="Password"
                            name="password"
                        />
                        <button
                            className="btn btn-success my-1"
                            onClick={async e => {
                                e.preventDefault();
                                const user = {
                                    email: document.querySelector(".email").value,

                                    password: document.querySelector(".password").value
                                };
                                const response = await axios.post(
                                    `${backendURL}/user/login`,
                                    user,
                                    { "Content-Type": "application/json" }
                                );

                                console.log(response);

                                if (response.status === 200) {
                                    setStateUserCheck(true)

                                    props.setUserDetails(response.data);
                                }
                            }}
                        >
                            Submit
            </button>
                        <br />
                        <p className="text-secondary mt-2">
                            Don't have account, then create one{" "}
                            <span>
                                {" "}
                                <a href="/signUp">click here</a>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        );
}


export default connect(null, { setUserDetails })(Login)