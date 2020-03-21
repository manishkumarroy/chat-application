import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUserDetails } from '../../actions/userAction'
import { backendURL } from '../../config'
import axios from "axios"

function UserProfile(props) {
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



    return (

        <div className="userProfile">
            <div className="mainInfo">
                <img src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png" alt="" width="200px" />
                <h3 className="text-primary mb-3 text-center">{User.name}</h3>



            </div>


            {props.userView.type === "friendProfileView" ?

                <div className="centerFlexRow">
                    <button className="btn btn-success semiRound" onClick={(e) => {
                       
                        const data = {
                            friendId: props.userView.user.userDetails._id,
                            senderId: props.user._id,
                            friendName: props.userView.user.userDetails.name,
                            senderName: props.user.name,
                            friendEmail: props.userView.user.userDetails.email,
                            senderEmail:props.user.email
                        }

                        console.log(data)
                        axios.post(`${backendURL}/user/addFriend`, data)

                    }}>Add User</button>

                    <button className="btn btn-outline-danger semiRound ml-3" onClick={(e) => {
                        const data = {
                            friendId: props.userView.user.userDetails._id,
                            senderId: props.user._id,
                            friendName: props.userView.user.userDetails.name,
                            senderName: props.user.name,
                             friendEmail: props.userView.user.userDetails.email,
                            senderEmail:props.user.email
                        }

                        console.log(data)
                        axios.post(`${backendURL}/user/responseFriendRequest`, data)

                    }}>Block User</button></div> : null}







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





    )
}

const mapStateToProps = (state) => ({
    user: state.user.userDetails,
    userView: state.chatScreenChanger
})

export default connect(mapStateToProps, { setUserDetails })(UserProfile)