const DisplaySingle = ({country, toShow}) => {
    const style = {
        fontSize: 100,
        padding: 0,
        margin: 0
    }

    if (toShow === "Hide") {
        return (
            <div>
            <h1>{country.name.common}</h1>
            <p>Capital city: {country.capital[0]}</p>
            <ul>
                <li>Language</li>
                {Object.values(country.languages).map((x,i)=> <li key={i}>{x}</li>)}
            </ul>
            <p style={style}>{country.flag}</p>
            </div>
        )
    }

}

export default DisplaySingle