export const searchCity = async (city: string) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=5d8127b6cafb8d48ed188fd219ec2df9`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeather = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5d8127b6cafb8d48ed188fd219ec2df9`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getForecast = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=5d8127b6cafb8d48ed188fd219ec2df9&units=imperial`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
