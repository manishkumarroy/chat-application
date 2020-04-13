import React from 'react'
import { connect } from 'react-redux'
import { sideBarChanger } from '../../actions/sideBarAction'

function UserInfo(props) {
    const User = props.user
    return (
        <div className="userInfo p-3 clearfix" >

            <img src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png" alt="" className="rounded-circle" width="38px" />

            <h6 className="text-light ml-2">{User.name}</h6>

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
                    }}>
                    notifications
                  
                </i>
                <div className=" rounded-circle p-1 text-light notification-circle" > 2</div>
                </span>


                <i className="material-icons text-dark">
                    donut_large</i>

            </div>



        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.userDetails,
    contentViewer: state.sideBarChanger.contentViewer
})

export default connect(mapStateToProps, { sideBarChanger })(UserInfo)
