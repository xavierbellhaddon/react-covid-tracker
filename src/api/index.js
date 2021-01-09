import axios from "axios";
import { DateTime } from "luxon";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let changeableURL = url;
    if (country) {
        changeableURL = `${url}/countries/${country}`
    }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableURL);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.covidtracking.com/v1/us/daily.json"
    );

    const modifiedData = data.map((dailyData) => ({
        confirmed: dailyData.positive, 
        deaths: dailyData.death,
        date: DateTime.fromISO(dailyData.dateChecked).toLocaleString(DateTime.DATE_FULL)
    }))

    return modifiedData;
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);
        // console.log('countries: ', response);
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error)
    }
}