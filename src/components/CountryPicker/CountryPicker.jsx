import React, { useState } from 'react'

const CountryPicker = ({ countries, theme, fetchDataHandler, ...rest }) => {
  const [selectedCountry, selectCountry] = useState('Global');

  const mapData = (countries) => {
    return [
      <option key={0} value='Global'>Global</option>,
      <optgroup label="Countries">
        {countries.map((country, i) => {
          return <option key={i + 1} value={country}>{ country }</option>
        })}
      </optgroup>
    ]
  }

  const selectCountryHandler = (e) => {
    let countryName = e.target.value;

    selectCountry(countryName);
    fetchDataHandler(countryName.toLowerCase() === 'global' ? "" : countryName);
  }

  return (
    <div className='country-picker-container'>
      <select className={`country-picker ${theme === 'day' ? "day-highlighter" : "night-highlighter"}`} onChange={selectCountryHandler}>
        {
          countries.length
            ?  mapData(countries)
            :  <option value='loading...'>loading countries...</option>
        }
      </select>

      <div className='country-name-container'>
        {countries.length
          ? <h1>{selectedCountry}</h1>
          : null
        }
        <hr/>
      </div>
    </div>
  )
}

export default CountryPicker;
