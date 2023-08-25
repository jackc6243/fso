const Form = ({newName, newPhone, handleSubmit, handleChange, setNewName, setNewPhone}) => {

    return (
        <div>
            <h2>Add a new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                Name: <input value={newName} onChange={handleChange(setNewName)}/>
                </div>
                <div>
                Phone: <input value={newPhone} onChange={handleChange(setNewPhone)}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form