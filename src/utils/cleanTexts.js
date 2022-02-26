export const cleanMoneyFormatedText = (text) => {
  const value = text || "";
  const cleanedValue = value.replace(/[^0-9.]/g, "");

  if (cleanedValue.match(/^(?:\d+(?:\.\d{0,2})?)?$/gm)) {
    return cleanedValue;
  }

  return null;
};
export const cleanNumberFormatedText = (text) => {
  const value = text || "";
  const cleanedValue = value.replace(/[^0-9]/g, "");

  return cleanedValue;
};

export const completeWithZeros = (text = "", length = 2) => {
  const splitedText = text?.split(".");
  if (splitedText?.length !== 2) {
    return text;
  }
  const integerPart = splitedText[0];
  const decimalPart = splitedText[1];
  const filled = decimalPart.padEnd(length, "0");

  return `${integerPart}.${filled}`;
};

export const isNumberBetween = (number, min, max) => {

  if ((number !== 0 && !number) || (min !== 0 && !min) || (max !== 0 && !max)) {
    return false;
  }

  const myValue = Number(number);
  
  return !isNaN(myValue) && myValue >= min && myValue <= max;
};

export const isNumberNotBetweenCurated = (min, max) => (number) =>
  !isNumberBetween(number, min, max);
