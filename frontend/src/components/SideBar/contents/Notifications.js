import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { backendURL } from '../../../config'

import showNotifications from "./helpers/notification/notificationHelper";

function Notifications(props) {
    const [loading, setloading] = useState(true)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        axios.get(`${backendURL}/user/friendRequests/${props.user._id}`).then((res) => {

            setloading(false)
            setNotifications(res.data.friendList.filter(notify => notify.stage !== "none"))

        }).catch(err => console.log(err))


    }, [])

    let data = notifications.filter(notify => notify.stage == "accepted" && !notify.sender)
    let data2 = notifications.filter(notify => notify.stage == "sent" && notify.sender)
    return (
        <div className={loading === true ? "notification-list centerFlex" : "notification -list"} >
            {loading ? <h1> loading</h1> :
                notifications.length === data.length || notifications.length === data2.length ?
                    <div className="" style={{ display: "flex", justifyContent: "center", flexDirection: "column", height: "70vh", alignItems: "center" }}>   <img src="https://image.flaticon.com/icons/svg/2228/2228042.svg" alt="" width="150px" />

                        <h5>No Notifications</h5>
                    </div> :
                    notifications.length ?

                        <div>
                            {showNotifications(notifications, setNotifications, props)}

                        </div>
                        : <div className="" style={{ display: "flex", justifyContent: "center", flexDirection: "column", height: "70vh", alignItems: "center" }}>   <img src="https://image.flaticon.com/icons/svg/2228/2228042.svg" alt="" width="150px" />

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