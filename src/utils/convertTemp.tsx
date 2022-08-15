export const convertTemp = (currentTemp: number) => {
  const kelvinToCelcius = Number((currentTemp - 273.15).toFixed(0));
  const celciusToFahrenheit = ((kelvinToCelcius * 9) / 5 + 32).toFixed(0);
  const fahrenheitToCelcius = (((currentTemp - 32) * 5) / 9).toFixed(0);

  return {
    kelvinToCelcius,
    celciusToFahrenheit,
    fahrenheitToCelcius,
  }
};
