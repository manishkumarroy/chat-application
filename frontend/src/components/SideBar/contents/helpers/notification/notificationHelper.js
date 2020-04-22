import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { backendURL } from '../../../../../config'
const responseFriendRequestsDisplay = (notify, props, setNotifications, index, notifications) => {
    let bgNew = notify.new ? "#f5fcff" : "white"

    return <li className="p-1 px-3 centerFlexRow list-group-item text-light" style={{ cursor: "pointer", minHeight: "10vh", backgroundColor: bgNew }} key={index}>

        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60 " alt="" alt="" width="40px" height="40px" style={{ borderRadius: "50%" }} />

        <div>
            <h6 className="d-inline-block ml-3 text-secondary" >{notify.name}</h6>
        </div>


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
                                    friendName: props.user.name,
                                    response: true

                                }


                                console.log(data)
                                axios.post(`${backendURL}/user/responseFriendRequest`, data)
                                notifications[index].accepted = "true"

                                setNotifications([...notifications])

                            }}>
                            Accept</button>

                        <button className="btn  btn-light btn-sm ml-2 semiRound"

                            onClick={() => {

                                const data = {
                                    senderId: notify.friend_id,
                                    friendId: props.user._id,

                                    response: false

                                }


                                console.log(data)
                                axios.post(`${backendURL}/user/responseFriendRequest`, data)
                                notifications[index].accepted = "false"


                                setNotifications([...notifications])
                            }}>Decline</button> </>}

        </div>
    </li>

}

const respondedFriendRequestsDisplay = (notify, props, setNotifications, index, notifications) => {
    let bgNew = notify.new ? "#f5fcff" : "white"

    return <li className="centerFlexRow list-group-item notification-accepted" style={{ cursor: "pointer", maxHeight: "10vh", backgroundColor: bgNew }} key={index}>
        {index % 2 == 0 ? <img src="https://i.pinimg.com/736x/2f/4e/8f/2f4e8f862d6f66b2107081fcb35473cd.jpg" alt="" width="40px" height="40px" style={{ borderRadius: "50%" }} /> : <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60 " alt="" alt="" width="40px" height="40px" style={{ borderRadius: "50%" }} />}

        <div className="centerFlexRow">
            <h6 className="text-secondary ml-2" >{notify.name}
                {" "}accepted your request.
                                        </h6>
            <h6 className="text-primary centerFlexRow">
                <i className="material-icons">check_circle</i>
                        12:05</h6>

        </div>



    </li>

}

export default function showNotifications(notifications, setNotifications, props) {

    return notifications.map((notify, index) => {
        console.log(notify)



        return !notify.sender && notify.stage !== "accepted" ?
            responseFriendRequestsDisplay(notify, props, setNotifications, index, notifications)

            :

            notify.stage === "accepted" && notify.sender ?
                respondedFriendRequestsDisplay(notify, notify, props, setNotifications, index, notifications)

                :

                null
    }


    )

}