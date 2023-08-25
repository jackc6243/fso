import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import axios from "axios"
import Countries from './components/Countries';

function App() {
  const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"
  
  const [country, setCountry] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [countryList, setCountryList] = useState([])

  useEffect(() => {
    if (country) {
      axios.get(`${baseURL}/all`)
      .then(response => {
        const newList = []
        response.data.forEach(c => {
          if (c.name.common.toLowerCase().startsWith(country) || c.name.official.toLowerCase().startsWith(country)) {
            newList.push(c)
          }
        });

        if (newList.length > 10) {
          setErrorMessage("Too many countries, be more specific")
          setCountryList([])
        } else if (newList.length === 0) {
          setErrorMessage("Cannot find this country")
        } else {
          setErrorMessage("")
          setCountryList(newList)
        }
        
      })
    }}, [country])



  const handleInput = (e) => {
    setCountry(e.target.value.toLowerCase())
  }

  return (
    <div>
      <p>find countries: <input value={country} onChange={handleInput}/></p>
      <p>{errorMessage}</p>
      <Countries countryList={countryList}/>
    </div>
  );
}

export default App;
