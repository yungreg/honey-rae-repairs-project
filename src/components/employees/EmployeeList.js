/* 
https://github.com/nashville-software-school/client-side-mastery/blob/cohort-59/book-7-honey-rae-repairs/chapters/HONEY_EMPLOYEE_LIST.md
todo: build a component that will list the employees, NOT all users
todo: use teh query string parameter (finally)
*/

import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
//!note: don't forget the dependency array wehen setting up a useEffect to monitor State
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((employeeArray) =>{
                setEmployees(employeeArray)
            })
        }, []
    )

    return <article className="employees">
    {
        employees.map(employee => <Employee 
        key={`employee--${employee.id}`}
        id={employee.id}
        fullName={employee.fullName}
        email={employee.email} /> 
        )
    }
    </article>
}