import React from 'react'
import UserInfo from './UserInfo'
import ContentList from './ContentList'

import Options from './Options'
import SidebarSearch from './SidebarSearch'
import { connect } from 'react-redux'


function SideBar(props) {
    return (
        <div className="sideBar ">
            {props.view === true ? <SidebarSearch /> : <UserInfo />}


            <Options />



            <ContentList />


        </div>
    )
}

const mapStateToProps = (state) => ({
    view: state.sideBarChanger.searchView

})

export default connect(mapStateToProps)(SideBar)

