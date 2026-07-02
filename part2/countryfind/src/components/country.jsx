import { useState, useEffect } from 'react'
import countryService from '../services/country.js'
const Country = ({ countries, target }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  useEffect(() => {
    setSelectedCountry(null)
  }, [target])
  if (!target) return null;
  const doesIncludeTarget = (country) => {
    return country.name.common.toLowerCase().includes(target.trim().toLowerCase())
  }
  const countryList = countries.filter(doesIncludeTarget)
  if (countryList.length > 10) {
    return <p>Too many Countries</p>
  } else if (countryList.length < 10 && countryList.length !== 1) {
    if (selectedCountry) {
      const s = selectedCountry
      const selectedCountryLanguageList = Object.values(s.languages).map(language => <li key={language}>{language}</li>)
      return <>
        <h1>{s.name.common}</h1>
        <p>Capital {s.capital[0]}</p>
        <p>Area {s.area}</p>
        <h2>Languages</h2>
        <ul>
          {selectedCountryLanguageList}
        </ul>
        <img src={s.flags.png} />
        <h2>weather in {s.capital}</h2>
        <p>Temprature</p>
      </>
    }
    return countryList.map(x => <p key={x.name.common}>{x.name.common}<button onClick={() => setSelectedCountry(x)}>Show</button></p>)
  } else if (countryList.length === 1) {
    const remainingCountry = countryList[0];
    const countryLanguagesList = Object.values(remainingCountry.languages).map(language => <li key={language}>{language}</li>)
    return <>
      <h1>{remainingCountry.name.common}</h1>
      <p>Capital {remainingCountry.capital[0]}</p>
      <p>Area {remainingCountry.area}</p>
      <h2>Languages</h2>
      <ul>
        {countryLanguagesList}
      </ul>
      <img src={remainingCountry.flags.png} />
      <h2>weather in {remainingCountry.capital}</h2>
    </>
  }

}
export default Country
