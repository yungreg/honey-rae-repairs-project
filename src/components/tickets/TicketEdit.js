/*
*todo: import theticetEdit yntax
*todo: fillin JSX
todo: inmport react hooks you need
*/

import { useState, useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom"


// TODO*: Add the correct default properties to the initial state object
export const TicketEdit = () => {
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false,
    })
    const navigate = useNavigate()
    const { ticketId } = useParams()
//TODO: makle a useEffect to set teh state of tickets
useEffect(
    () => {
        fetch(`http://localhost:8088/serviceTickets/?${ticketId}`)
        .then(response => response.json())
        .then((info) => {
            const data = info[0]
            updateTicket(data)
        })
    }, [] // When this array is empty, you are observing initial component state
)

  // TODO: Create the object to be saved to the API
  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ticket),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/tickets");
      })
  }

return <form className="ticketForm">
        <h2 className="ticketForm__title">Update Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.description = evt.target.value
                            updateTicket(copy)
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    checked={ticket.emergency}
                    onChange={
                        (changeEvent) => {
                            const copy = {...ticket}
                            copy.emergency = changeEvent.target.checked
                            updateTicket(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Submit Ticket
        </button>
    </form>
}