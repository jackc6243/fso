import DisplaySingle from "./DisplaySingle"
import {useState, useEffect} from "react"

const Countries = ({countryList}) => {
    const [buttonList, setButtonList] = useState([])

    useEffect(() => {
        console.log("country list length ", countryList.length)
        setButtonList(Array.from(Array(countryList.length), x => "Show"))
        console.log(buttonList)
    }, [countryList])

    const handleClick = (id) => (e) => {
        let temp = buttonList[id]
        temp = temp === "Hide" ? "Show" : "Hide"
        setButtonList(buttonList.map((x, i) => i !== id ? x : temp))
    }

    if (countryList.length == 1) {
        return (
            <DisplaySingle country={countryList[0]} toShow={true}/>
        )
    }
    
    return (
        <ul>
            {countryList.map((c, id) => {

                return (
                    <div>
                    <li key={id}>{c.name.common} <button onClick={handleClick(id)}>{buttonList[id]}</button></li>
                    <DisplaySingle country={c} toShow={buttonList[id]}/>
                    </div>
                )
            })}
        </ul>
    )
}

export default Countries

// {buttonList[id]}