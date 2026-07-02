import { useState, useEffect } from "react"
import countryService from './services/country.js'
import Country from './components/country.jsx'
const App = () => {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    countryService.getAll().then(countriesList => setCountries(countriesList))

  }, [])
  const searchNames = (e) => {
    setCountryName(e.target.value)
  }
  return <div>
    Find Countries: <input value={countryName} onChange={searchNames} />
    <Country countries={countries} target={countryName} />
  </div>
}
export default App
