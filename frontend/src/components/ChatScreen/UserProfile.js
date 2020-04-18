import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setUserDetails } from '../../actions/userAction'
import { backendURL } from '../../config'
import axios from "axios"

function UserProfile(props) {
    const [friendCheck, friendCheckState] = useState(null)
    const [loading, setLoading] = useState(true)

    const User = props.userView.type === "friendProfileView" ? props.userView.user.userDetails : props.user

    useEffect(() => {
        if (localStorage.length === 2) {
            console.log("working")
            props.setUserDetails({
                user: JSON.parse(localStorage.getItem("user"))
            }
            )
        }



    }, []) // eslint-disable-next-line-react-hooks/exhaustive-deps

    useEffect(() => {
        console.log("nox run", props)
        if (props.user && props.userView.user.userDetails)
            if (props.userView.user.userDetails._id !== props.user._id) {
                axios.get(`${backendURL}/user/friendCheck/${props.user._id}/${props.userView.user.userDetails._id}`

                ).then((res) => {
                    setLoading(false)
                    friendCheckState(res.data)
                })

            }

    }, [props.userView.type])




    if (!loading)
        return <div className="userProfile">
            <div className="mainInfo">
                <img src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png" alt="" width="200px" />
                <h3 className="text-primary mb-3 text-center">{User.name}</h3>



            </div>


            {props.userView.type === "friendProfileView" ?

                <div className="centerFlexRow">
                    {!friendCheck ? <button className="btn btn-success semiRound mt-2" onClick={(e) => {

                        const data = {
                            friendId: props.userView.user.userDetails._id,
                            senderId: props.user._id,
                            friendName: props.userView.user.userDetails.name,
                            senderName: props.user.name,
                            friendEmail: props.userView.user.userDetails.email,
                            senderEmail: props.user.email
                        }

                        console.log(data)
                        axios.post(`${backendURL}/user/addFriend`, data)

                    }}>Add User</button> : <div className="rounded-circle p-2 semiRound bg-primary text-light">Friends</div>}


                </div> : null}







            <div className="extraInfo mt-4">
                <hr />
                <div>
                    <i className="material-icons bg-danger">mail</i>
                    <h5>{User.email}</h5>
                </div>

                <div>
                    <i className="material-icons">group</i>
                    <h5>90</h5>
                </div>

                <div>
                    <i className="material-icons " style={{ backgroundColor: "orangered" }}>phone</i>
                    <h5>87678989</h5>
                </div>

                <div>
                    <i className="material-icons bg-warning">location_on</i>
                    <h5>India, Delhi</h5>
                </div>

            </div>

        </div>





    else
        return <h1>Loading</h1>
}

const mapStateToProps = (state) => ({
    user: state.user.userDetails,
    userView: state.chatScreenChanger
})

export default connect(mapStateToProps, { setUserDetails })(UserProfile)