import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { backendURL } from '../../../config'
import { changeChatScreen } from "../../../actions/transitionAction"
import { setFastMessages } from "../../../actions/messageAction";

function FriendList(props) {
    const { userId } = props
    const [loading, setLoading] = useState(true)
    const [friends, setFreinds] = useState([])

    useEffect(() => {



        axios.get(`${backendURL}/user/friends/${userId}`).then(response => {

            setLoading(false)


            setFreinds([...response.data])
        })

        axios.get(`${backendURL}/user/messages/${props.userId}`).then((res) => {
            console.log(res
            )
            props.setFastMessages(res.data, true)

        })





    }, [userId])


    console.log(loading)

    if (loading)
        return <h2>loading....</h2>
    else
        if (friends.length) {


            return <div className="friendList">
                {friends.map(
                    user => <li className="list-group-item   text-dark centerFlexRow"
                        id={user["_id"]} style={{ cursor: "pointer", height: "10vh" }}

                        key={user["_id"]} onClick={(e) => {
                            if (!e.target.classList.contains("material-icons"))
                                props.changeChatScreen({ value: { userDetails: user, userId: null }, type: "friendProfileView" })
                        }}>
                        <img src="https://i.pinimg.com/736x/2f/4e/8f/2f4e8f862d6f66b2107081fcb35473cd.jpg" alt=""
                            style={{ borderRadius: "50%" }}
                            width="40px" height="40px" />
                        <h6 className=" ml-3">{user.name}

                        </h6>

                        <i className="material-icons ml-auto" onClick={() => {
                            props.changeChatScreen({ value: { userDetails: user, userId: null }, type: "messageView" })
                        }}>message</i>

                    </li>)
                }</div>
        }
        else

            return (
                <div className="initialFriendList centerFlex">
                    <img src="https://image.flaticon.com/icons/svg/1500/1500330.svg" alt="" width="80px" />

                    <button className="btn btn-success mt-4 semiRound">Add Friends</button>

                </div>
            )
}

const mapStateToProps = (state) => {
    return ({
        friendList: state.user.friendList,
        userId: state.user.userDetails._id
    })

}
export default connect(mapStateToProps, { changeChatScreen, setFastMessages })(FriendList)