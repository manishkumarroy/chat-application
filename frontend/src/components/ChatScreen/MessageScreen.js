import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react'


class MessageScreen extends Component {
    render() {


        let messagesInfo = { messages: [] }


        console.log(this.props.messages)
        const User = this.props.user

        if (this.props.messages.length)
            this.props.messages.every((msgInfo) => {
                console.log(msgInfo)
                console.log(this.props.userMessage.friend_id)
                if (msgInfo.recieverId === this.props.userMessage.friend_id) {
                    messagesInfo.messages = msgInfo.messages;
                    messagesInfo.recieverId = msgInfo.recieverId
                    console.log(messagesInfo)
                    return false

                }

            })

        return (
            <div className="messageScreen p-4" style={{ height: "80vh", width: "100%", overflowY: "scroll" }}>
                {messagesInfo.messages.length ? messagesInfo.messages.map((msg, i) => {
                    if (msg.sender || msg.senderId === User._id)
                        if (msg.imageText) {
                            return <div className=" p-2  rounded message message-sent   card ml-auto" key={i}>
                                <img src={msg.imageText} alt="" height="200px" />

                                <div className="extras">

                                    <span className="time">{msg.sentTime}</span>
                                    {!msg.status ? <i className="material-icons">schedule</i> :
                                        msg.status === "delivered" ?

                                            <i className="material-icons">done_all</i>
                                            :
                                            msg.status === "sent" ?

                                                <i className="material-icons">done</i>
                                                :
                                                <i className="material-icons">check_circle</i>}



                                </div>


                            </div>

                        }
                        else
                            return <div className=" p-2  rounded message message-sent   card ml-auto" key={i}>

                                <p>{msg.messageText}</p>

                                <div className="extras">

                                    <span className="time">{msg.sentTime}</span>
                                    {!msg.status ? <i className="material-icons">schedule</i> :
                                        msg.status === "delivered" ?

                                            <i className="material-icons">done_all</i>
                                            :
                                            msg.status === "sent" ?

                                                <i className="material-icons">done</i>
                                                :
                                                <i className="material-icons">check_circle</i>}



                                </div>


                            </div>

                    else

                        return <div className="p-2  rounded message card mr-auto" key={i}>

                            <p>{msg.messageText} </p>
                            <div className="extras">
                                <span className="time">{msg.sentTime}</span>
                            </div>







                        </div>


                }) : null}


            </div>
        )


    }
    componentDidUpdate() {
        document.querySelector(".messageScreen").scrollTo(0, document.querySelector(".messageScreen").scrollHeight)
    }

    componentDidMount() {

        document.querySelector(".messageScreen").scrollTo(0, document.querySelector(".messageScreen").scrollHeight)

    }

}





const mapStateToProps = (state) => ({
    messages: state.messageDetails.fastMessages,
    user: state.user.userDetails,
    userMessage: state.chatScreenChanger.user.userDetails
})

export default connect(mapStateToProps, null)(MessageScreen)