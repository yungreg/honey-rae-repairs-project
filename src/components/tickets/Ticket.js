
/*
*todo: get throgh claimticket! you can do it! 
todo: coem back to this video about claiming tickets again to observe state : https://watch.screencastify.com/v/85s4TeoBoURaOdtsqmR4
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


//todo*: create the function for a button with conditions that only let employees view or use it
//todo*: add onClick that will run closeTicket on click
//todo: display the button
const canCloseTicket = () => {
    if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
        return <button className="ticket_finish" 
        onClick={closeTicket}>Finish Ticket!</button>
    } else {
        return ""
    }
}
//todo: create a function that will actuall mark ther ticket closed when thhe finish ticket button is clicked
    const closeTicket = () => {
    const copy =  {
        userId: ticketObject.userId,
        description: ticketObject.description,
        emergency: ticketObject.emergency,
        dateCompleted: new Date()
    }

    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(copy)
    })
      .then((res) => res.json())
      .then(getAllTickets) //youc an pass a fn() reference to .then so it'll just invoke it
}


// modify the button to only show it when an employee is logged in
const buttonOrNoButton = () => {
    if(currentUser.staff){
        return <button 
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
    } else {
        return ""
    }
}

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
    <footer className="ticket__footer">
        {/* steve's tip: avoid wiriting nested ternary statements. split them into components or functions instead. tip here: https://watch.screencastify.com/v/Noestc1pbJfib5usYjBF */}
        {
            ticketObject.employeeTickets.length
            ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName :""}`
            : buttonOrNoButton()
        }
        {
            canCloseTicket()
        }
        </footer> 
</section>
}