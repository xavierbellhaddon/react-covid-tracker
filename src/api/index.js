import axios from "axios";
import { DateTime } from "luxon";

const url = "https://corona.lmao.ninja/v2";

export const fetchData = async (country) => {
    let changeableURL = `${url}/all`;
    if (country) {
        changeableURL = `${url}/countries/${country}`
    }
  try {
    const {
      data: { cases, recovered, deaths }
    } = await axios.get(changeableURL);
    return { cases, recovered, deaths };
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
        const { data } = await axios.get(`${url}/countries`);
        return data.map((country) => country.country)
    } catch (error) {
        console.log(error)
    }
}