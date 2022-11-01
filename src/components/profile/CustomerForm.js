/*
*todo: import empoyeeForm
*todo: import react elements
todo: refactor the component to become what you need
*/
import { useEffect, useState } from "react"

export const CustomerForm = () => {
 
    // TODO: Provide initial state for profile
    const [customerProfile, updateCustomerProfile] = useState ({
        address: "",
        phoneNumber: "",
        userId: 0
    })

    // TODO: Get employee profile info from API and update state
    
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


    const [feedback, setFeedback] = useState("")

    // useEffect(() => {
    // if (feedback !== "") {
    //     // Clear feedback to make entire element disappear after 3 seconds
    //     setTimeout(() => setFeedback(""), 3000);
    // }
    // }, [feedback])

    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((data)=> {
                const employeeObject = data[0]
                updateCustomerProfile(employeeObject)
        })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            *TODO: Perform the PUT fetch() call here to update the profile/permanent state.
            Navigate user to home page when done.
        
        */
       return fetch(`http://localhost:8088/customers/userId=${customerProfile.userId}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerProfile)

       }) 
            .then(response => response.json())
            .then(() => {
                setFeedback("Customer profile successfully updated!")
            })
    }

    return ( 
        
        <form className="profile">
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}</div>
            <h2 className="profile__title">Update your profile!</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={customerProfile.address}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = {...customerProfile}
                                copy.address = evt.target.value
                                updateCustomerProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={customerProfile.phoneNumber}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                const copy = {...customerProfile}
                                copy.phoneNumber = evt.target.value
                                updateCustomerProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Update Profile!
            </button>
        </form>
    )
}
