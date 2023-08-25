const Display = ({phonebook, handleDelete}) => {


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
                    <td><button onClick={handleDelete(person.id)}>Delete</button></td>
                </tr>
                )}
            </tbody>
        </table>
    )
}

export default Display