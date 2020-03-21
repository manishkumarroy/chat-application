import React from 'react'
import { changeChatScreen } from '../../../actions/transitionAction'
import { connect } from 'react-redux'
function ChatList(props) {
    const chatList = props.chatList
    return (
        <div className="chatList">
            {chatList.length ? <>


                {chatList.map(user => <li className="list-group-item mb-2  text-dark "
                    id={user["_id"]} style={{ cursor: "pointer" }}
                    onClick={() => {
                        props.changeChatScreen(user, "messageView")
                    }}
                    key={user["_id"]}>
                    <img src="https://i.pinimg.com/736x/2f/4e/8f/2f4e8f862d6f66b2107081fcb35473cd.jpg" alt=""
                        style={{ borderRadius: "50%" }}
                        width="40px" height="40px" />
                    <h6 className="d-inline-block ml-3">{user.name}</h6>
                </li>)}
            </>



                : <div className="initialChat">

                    <img src="https://image.flaticon.com/icons/svg/458/458875.svg" alt="" width="80px" />

                    <button className="btn  my-3 btn-info">Start Chatting</button>
                </div>}

        </div>
    )
}
const mapStateToProps = (state) => ({
    chatList: state.user.chatList
})
export default connect(mapStateToProps, { changeChatScreen })(ChatList)
