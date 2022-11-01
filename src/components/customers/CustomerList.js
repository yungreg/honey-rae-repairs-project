/* 
*todo: import the Emplyee List componenet
todo: refactor to build a component that will list the customers, NOT all users
todo: use teh query string parameter (finally)
todo: use optional chaining 
*/

import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customer.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
//!note: don't forget the dependency array wehen setting up a useEffect to monitor State
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
            .then(response => response.json())
            .then((CustomerArray) =>{
                setCustomers(CustomerArray)
            })
        }, []
    )

    return <article className="customers">
    {
        customers.map(customer => <Customer 
        key={`customer--${customer.id}`}
        id={customer.id}
        fullName={customer?.user?.fullName} //! this prolly wint work without optiuonal chaining
        address={customer.address}  
        phoneNumber={customer.fullName} />
        )
    }
    </article>
}