const converter = require('./converter');

const gregorianToJalali = converter.gregorianToJalali;
const jalaliToGregorian = converter.jalaliToGregorian;

/**
 * This function takes the date and if less than 1700
 * convert it to Gregorian and if greater than 1700 convert it to Jalali
 * @param  {[String]} date
 * @return {[String]} Converted message
 */
function convertDate(date) {
  let inputDate = date.split('-');

  for (i in inputDate) {
    inputDate[i] = parseInt(inputDate[i]);
  }

  let convertedDate;

  if (inputDate[0] > 1700) {
    convertedDate = gregorianToJalali(inputDate[0], inputDate[1], inputDate[2]);
  } else {
    convertedDate = jalaliToGregorian(inputDate[0], inputDate[1], inputDate[2]);
  }

  return `${inputDate.join('-')} مصادف است با ${convertedDate.join('-')}`;
}

module.exports = {
  convertDate,
}
