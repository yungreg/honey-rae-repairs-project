
import { Link } from "react-router-dom";
import "./Tickets.css"



export const Ticket = ({ticketObject, isStaff, employees }) => {

    let assignedEmployee = null

if (ticketObject.employeeTickets.length > 0){
    const employeeObject =  ticketObject.employeeTickets[0]
    assignedEmployee = employees.find(employee => employee.id === employeeObject.employeeId)
}
    return <section key={`ticket--${ticketObject.id}`} className="ticketObject">
    <header>
        {
            isStaff 
            ? `Ticket ${ticketObject.id}`
            : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
        }
    </header>
    <section>{ticketObject.description}</section>
    <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section> 
    <footer>
        {
            ticketObject.employeeTickets.length
            ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee.user.fullName :""}`
            : <button>claim this one</button>
        }
        </footer> 
</section>
}