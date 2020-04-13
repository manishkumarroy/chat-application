import React from 'react'
import { connect } from 'react-redux'
import { sideBarChanger } from '../../actions/sideBarAction'



const optionChanger = (e, props) => {
    const iconType = e.target.innerHTML;
    console.log("-", iconType)
    if (iconType === "messages")
        props.sideBarChanger({
            value: 'showMessages',
            type: 'contentViewChange'
        })
    else
        if (iconType === "group")
            props.sideBarChanger({
                value: 'showFriends',
                type: 'contentViewChange'
            })
        else
            if (iconType === "person_add")
                props.sideBarChanger({
                    value: 'showUsers',
                    type: 'contentViewChange'
                })


}
function Options(props) {

    return (
        <div className="options py-2" onClick={(e) => optionChanger(e, props)}>
            <div className={props.sideBarChangerValue === 'showMessages' ? 'active' : null}>
                <span style={{ position: "relative" }}>
                    <i className="material-icons">
                        messages</i>
                    <div className=" rounded-circle p-1 text-light chat-notification-circle" > 4</div>
                </span>
            </div>


            <div className={props.sideBarChangerValue === 'showFriends' ? 'active' : null}>
                <i className="material-icons">
                    group</i></div>
            <div className={props.sideBarChangerValue === 'showUsers' ? 'active' : null}>
                <i className="material-icons">
                    person_add</i></div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    sideBarChangerValue: state.sideBarChanger.contentViewer

})
export default connect(mapStateToProps, { sideBarChanger })(Options)