import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { backendURL } from '../../../config'



function Notifications(props) {
    const [loading, setloading] = useState(true)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        axios.get(`${backendURL}/user/friendRequests/${props.user._id}`).then((res) => {

            setloading(false)
            setNotifications(res.data.friendList)

        }).catch(err => console.log(err))


    }, [])
    console.log(notifications)
    return (
        <div className={loading === true ? "notification-list centerFlex" : "notification -list"} >
            {loading ? <h1> loading</h1> :
                notifications.length ?

                    <div>
                        {notifications.map((notify, index) => {
                            console.log(notify)
                            return !notify.sender ? <li className="p-1 px-3 centerFlexRow list-group-item text-light" style={{ cursor: "pointer", minHeight: "10vh", backgroundColor: "#f5fcff" }} key={index}>
                                {index % 2 == 0 ? <img src="https://i.pinimg.com/736x/2f/4e/8f/2f4e8f862d6f66b2107081fcb35473cd.jpg" alt="" width="40px" height="40px" style={{ borderRadius: "50%" }} /> : <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60 " alt="" alt="" width="40px" height="40px" style={{ borderRadius: "50%" }} />}

                                <div>
                                    <h6 className="d-inline-block ml-3 text-secondary" >{notify.name}</h6>
                                </div>

                                {notify.stage === "recieved" ?
                                    <div className="ml-auto">
                                        {notify.accepted === "true" ?
                                            <div className="semiRound bg-success p-2 text-light" style={{ fontSize: "13px" }}>Accepted</div> :
                                            notify.accepted === "false" ?
                                                <div className="semiRound bg-danger p-2 text-light" style={{ fontSize: "13px" }}>Declined</div>
                                                :
                                                <>
                                                    <button className="btn  btn-primary btn-sm semiRound"
                                                        onClick={() => {
                                                            const data = {
                                                                senderId: notify.friend_id,
                                                                friendId: props.user._id,
                                                                senderName: notify.name,
                                                                friendName: props.user.name

                                                            }

                                                            console.log(data)
                                                            axios.post(`${backendURL}/user/       responseFriendRequest`, data)
                                                            notifications[index].accepted = "true"

                                                            setNotifications([...notifications])

                                                        }}>
                                                        Accept</button>

                                                    <button className="btn  btn-light btn-sm ml-2 semiRound"

                                                        onClick={() => {
                                                            notifications[index].accepted = "false"

                                                            setNotifications([...notifications])
                                                        }}>Decline</button> </>}

                                    </div> : null
                                } </li> : <li className="p-1 px-3 centerFlexRow list-group-item" style={{ cursor: "pointer", minHeight: "10vh" }} key={index}>
                                    {index % 2 == 0 ? <img src="https://i.pinimg.com/736x/2f/4e/8f/2f4e8f862d6f66b2107081fcb35473cd.jpg" alt="" width="40px" height="40px" style={{ borderRadius: "50%" }} /> : <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60 " alt="" alt="" width="40px" height="40px" style={{ borderRadius: "50%" }} />}

                                    <div>
                                        <h6 className="d-inline-block ml-3 text-secondary" >{notify.name}
                                            {" "}accepted your request.
                                        </h6>
                                    </div>


                                </li>
                        }


                        )}

                    </div>
                    : <div className="">   <img src="https://image.flaticon.com/icons/svg/2228/2228042.svg" alt="" width="150px" />

                        <h5>No Notifications</h5>
                    </div>}
        </div>


    )
}

const mapStateToProps = (state) => {
    return ({
        user: state.user.userDetails
    })
}

export default connect(mapStateToProps, null)(Notifications)