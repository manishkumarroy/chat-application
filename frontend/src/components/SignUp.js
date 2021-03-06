import React, { useState } from 'react'
import axios from 'axios'
import { backendURL } from "../config"

export default function SignUp() {
    const [user, setuser] = useState(null)
    console.log(user)
    console.log("object")
    return (
        <div className="container mt-4 m-auto"
            style={{ width: "60%" }}>
            <div className="card p-3 my-4">
                <h1 className="display-3">VChat</h1>
                <hr />
                <h3>Sign-up</h3>
                {user ? user.type === "success" ? <h5 className="p-2 bg-success text-light">{user.data}</h5> : <h5 className="p-2 bg-danger text-light">{user.data}</h5> : null}
                <hr />
                <form className="form-group" >
                    <input type="text" className="form-control my-1 name" placeholder="Name" />
                    <input type="email" className="form-control my-1 email" placeholder="Email" />
                    <input type="password" className="form-control my-1  password" placeholder="Password" />
                    <hr />
                    <button className="btn btn-success" type="submit" onClick={(e) => {
                        e.preventDefault();
                        const body = {
                            name: document.querySelector(".name").value,
                            email: document.querySelector(".email").value,
                            password: document.querySelector(".password").value

                        }
                        axios.post(`${backendURL}/user/register`, body, {
                            "Content-Type": "application/json"
                        }).then(res => setuser(res.data)).catch((err) => setuser({ type: "fail", data: "Some server error may be user already exists" }))

                    }}>
                        Submit
            </button>

                    <p className="text-secondary mt-2">Already have an account<span> <a href="/">click
                        here</a></span>
                    </p>

                </form>
            </div>

        </div>

    )
}

