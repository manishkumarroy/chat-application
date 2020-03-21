import React from 'react'
import { connect } from 'react-redux'
import { sideBarChanger } from '../../../actions/sideBarAction'

import { changeChatScreen } from '../../../actions/transitionAction'

function UsersList(props) {
    return (
        props.searchUsers.length ?
            <div className="searchUserList">
                {props.searchUsers.map(
                    user => <li className="list-group-item mb-2  text-dark "
                        id={user["_id"]} style={{ cursor: "pointer" }}

                        key={user["_id"]} onClick={() => {
                            props.changeChatScreen({ value: { userDetails: user, userId: null }, type: "friendProfileView" })
                        }}>
                        <img src="https://i.pinimg.com/736x/2f/4e/8f/2f4e8f862d6f66b2107081fcb35473cd.jpg" alt=""
                            style={{ borderRadius: "50%" }}
                            width="40px" height="40px" />
                        <h6 className="d-inline-block ml-3">{user.name}

                        </h6>

                    </li>)}

            </div>
            :

            <div className="initialFriendList centerFlex">
                <img src="https://image.flaticon.com/icons/svg/1256/1256650.svg" alt="" width="80px" />

                <h5 className="text-secondary my-4 text-center">Explore people around you <br /> make    friends</h5>

            </div>
    )
}
const mapStateToProps = (state) => (
    {
        searchUsers: state.sideBarChanger.searchUsers,



    }
)
export default connect(mapStateToProps, { sideBarChanger, changeChatScreen })(UsersList)