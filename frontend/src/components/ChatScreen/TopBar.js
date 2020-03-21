import React from 'react'
import { connect } from 'react-redux';


function TopBar(props) {
   

    return (
        <li className="list-group-item pt-3 px-4 bg-info text-light topBar">
            <img src="https://i.pinimg.com/736x/2f/4e/8f/2f4e8f862d6f66b2107081fcb35473cd.jpg" alt=""
                style={{ borderRadius: "50%" }}
                width="40px" height="40px" />

            <h6 className="d-inline-block ml-3">{props.reciever.userDetails.name}</h6>

            <div className="ml-auto">

                <i className="material-icons mr-2">
                    search
                        </i>
                <i className="material-icons mx-2">
                    attachments
                        </i>

                <i className="material-icons">
                    menu
                        </i>
            </div>

        </li>



    )
}

const mapStateToProps = (state) => ({
    reciever: state.chatScreenChanger.user
})
export default connect(mapStateToProps)(TopBar);
