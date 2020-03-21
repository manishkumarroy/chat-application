import React from 'react'
import { connect } from 'react-redux'

function MessageScreen(props) {
    const messages = props.messages
    const User = props.user
    return (
        <div className="messageScreen p-4 clearfix" style={{ height: "80vh", width: "100%", overflowY: "scroll" }}>
            {messages.length ? messages.map((msg, i) => {
                if (msg.reciever !== User.email)
                    return <div className=" p-2  rounded message  bg-primary text-light card ml-auto" key={i}>

                        <p>{msg.message} <br />
                            <span style={{ fontSize: "13px", float: "right" }}>{new Date().toLocaleTimeString()}</span> </p>


                    </div>

                else

                    return <div className="p-2  rounded message card" key={i}>

                        <p>{msg.message} <br />
                            <span style={{ fontSize: "13px", float: "right" }}>{new Date().toLocaleTimeString()}</span> </p>


                    </div>


            }) : null}

        </div>
    )
}

const mapStateToProps = (state) => ({
    messages: state.messageDetails.fastMessages,
    user: state.user.userDetails
})

export default connect(mapStateToProps, null)(MessageScreen)
