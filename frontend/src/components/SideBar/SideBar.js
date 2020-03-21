import React from 'react'
import UserInfo from './UserInfo'
import ContentList from './ContentList'

import Options from './Options'
import SidebarSearch from './SidebarSearch'


export default function SideBar() {
    return (
        <div className="sideBar ">
            <UserInfo />
            
            <Options />
            <SidebarSearch />
           
            <ContentList />


        </div>
    )
}



