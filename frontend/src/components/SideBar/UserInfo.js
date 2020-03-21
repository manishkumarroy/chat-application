import React from 'react'
import { connect } from 'react-redux'

function UserInfo(props) {
    const User = props.user
    return (
        <div className="userInfo p-3 clearfix" >

            <img src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png" alt="" className="rounded-circle" width="38px" />

            <h6 className="text-light ml-2">{User.name}</h6>

            <div className="ml-auto">
                <i className="material-icons text-dark">
                    search</i>
                <i className="material-icons text-dark mx-3">
                    notifications</i>


                <i className="material-icons text-dark">
                    donut_large</i>

            </div>



        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.userDetails
})

export default connect(mapStateToProps, null)(UserInfo)
