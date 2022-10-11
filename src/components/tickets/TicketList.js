/*
*todo: import the new TicketList component to update syntax
todo: 
*/

import { useEffect, useState } from "react"
import "./Tickets.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
            .then(response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
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

    //^ problem was not with my ticketlist component, it was with the .map() on line 46. had to switch it to filteredTickets, not regular tickets
    
    
    return <>
    <h2>List of Tickets</h2>
    
    <article className="tickets">
        {
            filteredTickets.map(
                (ticket) => {
                    return <section key={ticket.id} className="ticket">
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer> 
                    </section>
                }
            )
        }
    </article>
    </>
}