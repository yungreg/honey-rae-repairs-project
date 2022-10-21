export const TicketSearch = ({ setSearchTermsState }) => {
    return (
        <div>
            <input
            onChange={
                (changeEvent) => {
                    setSearchTermsState(changeEvent.target.value)
                }
            }
            type="text" placeholder="Enter search terms here!"/>
        </div>
    )
}