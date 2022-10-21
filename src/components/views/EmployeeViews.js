/*
!rememeber: component names have to be CaptialCase
*todo: import the CustomerViews component to update syntax
*todo: get rid of imports you arent using (they were moved to TicketContainer)
todo: renmove TivketForm route, so that employees dont see that form
*/

import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeList } from "../employees/EmployeeList"
import { TicketContainer } from "../tickets/TicketContainer"
import { TicketForm } from "../tickets/TicketForm"


export const EmployeeViews = () => {
	return (
        <Routes>
      
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>
                    
                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketContainer/> } />
                
                <Route path="employees" element={ <EmployeeList/> } />
            </Route>
        </Routes>
    )
}
