/* 
todo: create component that will creach search/filter functionality in the TicketySearch component 
todo: create a retutrn for that component that is the parent to both ticket search abnd ticket list
todo: import those two components for uise here
*/
import { TicketSearch } from "./TicketSearch"
import { TicketList } from "./TicketList"
import { useState } from "react"

export const TicketContainer = () => {
    const [searchTerms, setSearchTermsState] = useState("")

    return <>
    <TicketSearch setSearchTermsState = {setSearchTermsState}/>
    <TicketList searchTermsState = {searchTerms}/>
    </>
}

//^pick up here when you get back from lunch