import React from 'react'
import axios from "axios"
import { backendURL } from '../../config'
import { connect } from 'react-redux'
import { sideBarChanger } from '../../actions/sideBarAction'

function SidebarSearch(props) {

    return (
        <>
            {1 ? <div className="py-3 px-2 bg-secondary" >
                <input type="text" className="search p-2 " placeholder="Search for friends (Provide Username)" onKeyUpCapture={async (e) => {
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
            </div> : null}

        </>
    )
}

const mapStateToProps = (state) => ({
    searchUsers: state.sideBarChanger.searchUsers

})


export default connect(mapStateToProps, { sideBarChanger })(SidebarSearch)