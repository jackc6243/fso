const Display = ({phonebook}) => {

    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Phone number</th>
            </tr>
            <tbody>
            {phonebook.map(person => 
                <tr key={person.name}>
                    <td>{person.name}</td>
                    <td>{person.number}</td>
                </tr>
                )}
            </tbody>
        </table>
    )
}

export default Display