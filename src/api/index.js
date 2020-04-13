import axios from 'axios';

// url variables
const baseUrl = 'https://covid19.mathdro.id/api';
const dailyUpdates = 'https://covid19.mathdro.id/api/daily';
const countryWiseData = 'https://covid19.mathdro.id/api/countries';

// fetching overall data
export const fetchData = async (country) => {
  let url = baseUrl;

  if (country) {
    url = countryWiseData + '/' + country
  }

  try {
    const { data: { confirmed, recovered, deaths, lastUpdate }, status } = await axios.get(url);

    return { confirmed, recovered, deaths, lastUpdate, status };
  } catch (error) {
    return error;
  }

}

// fetching daily updates
export const fetchDailyUpdates = async () => {
  let url = dailyUpdates;

  try {
    const { data } = await axios.get(url);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
  } catch (error) {
    return error;
  }
};

// fetching all countries
export const fetchCountries = async () => {
  let url = countryWiseData;

  try {
    const { data: { countries } } = await axios.get(url);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};