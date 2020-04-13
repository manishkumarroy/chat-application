import React from 'react'
import axios from "axios"
import { backendURL } from '../../config'
import { connect } from 'react-redux'
import { sideBarChanger } from '../../actions/sideBarAction'

function SidebarSearch(props) {

    return (
        <div className="searchContainer bg-primary py-2 pr-2">
            <i className="material-icons back text-primary" onClick={() => {
                props.sideBarChanger({
                    type: "searchViewChange",
                    value: false
                })
            }}>arrow_left</i>
            <div className=" searchBox " >

                <input type="text" className="search p-2 bg-primary text-light" placeholder="Search for friends (Provide Username)" onKeyUpCapture={async (e) => {
                    console.log("rr")
                    let searchValue = String(e.target.value)
                    console.log(searchValue)
                    if (String(searchValue).length <= 2) {
                        props.sideBarChanger({ value: [], type: "setSerachUsers" })

                    }
                    else
                        if (String(searchValue).length > 2) {
                            try {
                                let response = await axios.get(`${backendURL}/user/name/${searchValue}`)
                                console.log(response)


                                props.sideBarChanger({ value: response.data, type: "setSerachUsers" })



                            }

                            catch (err) {
                                console.log(err)
                            }


                        }


                }} />
            </div></div>


    )
}

const mapStateToProps = (state) => ({
    searchUsers: state.sideBarChanger.searchUsers

})


export default connect(mapStateToProps, { sideBarChanger })(SidebarSearch)