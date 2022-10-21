/*
!rememeber: component names have to be CaptialCase
*todo: import the new ApplicationViews component to update syntax
*todo: get rid of imports you arent using 
*/

import { Outlet, Route, Routes } from "react-router-dom"

import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"


export const CustomerViews = () => {
	return (
        <Routes>
      
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>
                    
                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketList/> } />

                <Route path="ticket/create" element={ <TicketForm /> } />
            </Route>
        </Routes>
    )
}
