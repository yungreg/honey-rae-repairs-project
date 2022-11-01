/*
*todo: import the new TicketList component to update syntax
todo: 
*/
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Ticket } from "./Ticket"
import "./Tickets.css"

export const TicketList = ({ searchTermsState }) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergencyTickets, setEmergencyTickets] = useState(false)
    const [incompleteTicketsOnly, updateIncompleteTickets] = useState(false)
    const navigate = useNavigate()
    //^ when importing useNavigate, make sure to set that fn() to a variable for access in the body
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => { 
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermsState.toLowerCase())
            })
            setFiltered(searchedTickets)
        }, [ searchTermsState ]
    )

    useEffect(
        () => {
            if (emergencyTickets) {
                const filteredEmergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(filteredEmergencyTickets)
            } else {
                setFiltered(tickets)
            }
        }, 
        [emergencyTickets]
    )
//^ note this code above toggles the state of the show emergency button in the return at the bottom

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets/?_embed=employeeTickets`)
            .then(response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })
            
            fetch(`http://localhost:8088/employees?_expand=user`)
            .then(response => response.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            // console.log(tickets)
            //! check this out with the video
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        }, [tickets]
    )
    
    useEffect(() => {
      if (incompleteTicketsOnly) {
        const incompleteTicketsArray = tickets.filter((ticket) => {
          return (
            ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
          );
        });
        setFiltered(incompleteTicketsArray);
      } else {
        const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
        setFiltered(myTickets)
      }
    }, [incompleteTicketsOnly]
    );
    //^ this useEffect() monitors teh state of incompleteTicketsonly

    return <>
    <h2>List of Tickets</h2>
    {
        honeyUserObject.staff
        ? <>
        <button onClick={ () => { setEmergencyTickets(true)} }> Show Only Emergency Tickets!</button> 
        <button onClick={ () => { setEmergencyTickets(false)} }> Show All Tickets!</button> 
        </>
        : <>
        <button onClick={ () => navigate("/ticket/create") }>Create Service Ticket</button>
        <button onClick={ () => updateIncompleteTickets(true) }>Show Incomplete Service Tickets</button>
        <button onClick={ () => updateIncompleteTickets(false) }>Show All Service Tickets</button>
        </>
    }

    {/* //^the above is a "ternanry" statement. maybe review what that is. */}
    
   
    <article className="tickets">
        {
            filteredTickets.map(
                (ticket) => <Ticket currentUser={honeyUserObject} ticketObject={ticket}
                employees={employees} />
            )
        }
    </article>
    </>
}
//^ book 7 ch 5: the problem was not with my ticketlist component, it was with the .map() in the return below had to switch it to filteredTickets, not regular tickets