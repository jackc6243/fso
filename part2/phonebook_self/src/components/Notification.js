const Notification = ({message}) => {
    const style = {
        color: "red",
        fontStyle: "italic",
        fontSize: 16,
        border: "5px",
        borderColor: "red"
    }

    return (
        <div style={style}>{message}</div>
    )
}

export default Notification