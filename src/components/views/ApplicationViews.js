/*
*todo: import the new ApplicationViews component to update syntax
todo: work wioth Steve's video to create two different application views. https://watch.screencastify.com/v/ILD2tDn8tRnepx75Q04o
todo: create cxonditional to see if user is an employee or not
^leave the unused imports.. helps me see what's changed from session to session. 
*/

import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { TicketSearch } from "../tickets/TicketSearch"
import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {
	const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if(honeyUserObject.staff){
        return <EmployeeViews/>
    } else {
        return <CustomerViews/>
    }
    
}
