
/*
*todo: get throgh claimticket! you can do it! 
todo: coem back to this video again: https://watch.screencastify.com/v/85s4TeoBoURaOdtsqmR4
*/


import { Link } from "react-router-dom";
import "./Tickets.css"



export const Ticket = ({ticketObject, currentUser, employees, getAllTickets }) => {


    //!found teh assigned employyee for the current ticket
    let assignedEmployee = null

if (ticketObject.employeeTickets.length > 0){
    const employeeObject =  ticketObject.employeeTickets[0]
    assignedEmployee = employees.find(employee => employee.id === employeeObject.employeeId)
}

//found the employee profile object for the current USER
const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    return <section key={`ticket--${ticketObject.id}`} className="ticketObject">
    <header>
        {
            currentUser.staff
            ? `Ticket ${ticketObject.id}`
            : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
        }
    {/*  conditional logic for the header */}
    </header>
    <section>{ticketObject.description}</section>
    <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section> 
    <footer>
        {
            ticketObject.employeeTickets.length
            ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName :""}`
            : <button 
                onClick={()=>{
                    return fetch(`http://localhost:8088/employeeTickets`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            employeeId: userEmployee.id, 
                            serviceTicketId: ticketObject.id
                        })
                    })
                    .then(res => res.json())
                    .then(()=>{
                        getAllTickets()
                    })
                }}
                >claim this ticket</button>
        }
        </footer> 
</section>
}