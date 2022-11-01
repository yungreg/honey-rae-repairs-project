import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the initial state object
    */
    const [ticket, updateState] = useState({
        description: '',
        emergency: false,
        userId: 0
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect the user to the ticket list
    */

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const navigate = useNavigate()


    const handleSaveButtonClick = (event) => {
      event.preventDefault();
    //   console.log("YOU DIED");
      const ticketToStoreInAPI = {
        userId: honeyUserObject.id,
        description: ticket.description,
        emergency: ticket.emergency,
        dateCompleted: "",
      };
      //^ thsi is the template for info that'll get sent to teh API
      // TODO: Create the object to be saved to the API
      /*
        "id": 1,
    "userId": 0,
    "description": "",
    "emergency": false,
    "dateCompleted": ""
        */
      // TODO: Perform the fetch() to POST the object to the API
      return fetch(`http://localhost:8088/serviceTickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketToStoreInAPI),
      })
        .then((res) => res.json())
        .then(() => {
          navigate("/tickets");
        });
    };

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (changeEvent) => {
                                const copy = {...ticket}
                                copy.description = changeEvent.target.value
                                updateState(copy)
                            }
                        } />
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
                                updateState(copy)
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
    )
}

