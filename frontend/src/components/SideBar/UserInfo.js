import React from 'react'
import { connect } from 'react-redux'
import { sideBarChanger } from '../../actions/sideBarAction'
import {setNewNotificationsCount} from '../../actions/userAction'
import {changeChatScreen} from '../../actions/transitionAction'
import axios from 'axios'
import { backendURL } from '../../config'

function UserInfo(props) {
    const User = props.user
    return (
        <div className="userInfo p-3 clearfix" >

            <img src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png" alt="" className="rounded-circle" width="38px" />

            <h6 className="text-light ml-2" onClick={()=>{
                props.changeChatScreen({
                    type:"userProfileView",
                    value:{userDetails:props.user}
                })
            }}>{User.name}</h6>

            <div className="ml-auto">
                <i className="material-icons text-dark" onClick={()=>{
                    props.sideBarChanger({value:true,type:"searchViewChange"})
                }}>
                    search</i>
                <span style={{ position: "relative" }}>
                <i className={props.contentViewer === "showNotifications" ? `material-icons text-dark mx-3 activeNotification` : `material-icons text-dark mx-3 `}
                   
                    onClick={() => {
                        props.sideBarChanger({
                            value: "showNotifications",
                            type: "contentViewChange"
                        })
                       props.setNewNotificationsCount(0)
                    
                    axios.get(`${backendURL}/user/notifications/seen/${User._id}`).then(data=> console.log(data) )
                    }}>
                    notifications
                  
                </i>
                    {props.notificationCount ? <div className=" rounded-circle p-1 text-light notification-circle" >{props.notificationCount}</div> : null }
               
                </span>


                <i className="material-icons text-dark">
                    donut_large</i>

            </div>



        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.userDetails,
    contentViewer: state.sideBarChanger.contentViewer,
    notificationCount:state.user.newNotificationsCount
})

export default connect(mapStateToProps, { sideBarChanger,setNewNotificationsCount,changeChatScreen })(UserInfo)
