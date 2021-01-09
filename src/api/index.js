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
      "https://covid19.mathdro.id/api/daily"
    );

    const modifiedData = data.map((dailyData) => ({
        confirmed: dailyData.totalConfirmed,
        deaths: dailyData.deaths.total,
        date: DateTime.fromISO(dailyData.reportDate).toLocaleString(DateTime.DATE_FULL)
    }))

    return modifiedData;
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error)
    }
}