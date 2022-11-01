/* 
import react elements tso thegyh work
*/
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    const [employee, updateEmployee ] = useState({})
    
    useEffect(
    () => {
        fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then(response => response.json())
        .then((array) => {
            const singleEmployee = array[0]
            updateEmployee(singleEmployee)
        })
    }, [employeeId]
    )
    return <section className="employee">
    <header className="employee__header">Hello, {employee?.user?.fullName}!</header>
    <div>Email: {employee?.user?.email}</div>
    <div>Rate: {employee.rate}</div>
    <div>Specialty: {employee.specialty}</div>
    <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} ticket(s)!</footer>
</section>
}