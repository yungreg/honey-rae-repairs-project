import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer ] = useState({})
    
    useEffect(
    () => {
        fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
        .then(response => response.json())
        .then((object) => {
            const oneCustomer = object[0]
            updateCustomer(oneCustomer)
        })
    }, [customer]
    )
    return <section className="customer">
    <header className="customer__header"> Customer Name: {customer?.user?.fullName}!</header>
    <div>Email: {customer?.user?.email}</div>
    <div>Address: {customer.address}</div>
    <div>Phone Number: {customer.phoneNumber}</div>
</section>
}