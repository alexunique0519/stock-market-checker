export const convertDateToUnixTimestamp = date => {
  
  console.log('date', date)
  
  return Math.floor(date.getTime() / 1000)
}

export const convertUnitTimestampToDate = unitTime => {
  const milliSecs = unitTime * 1000 
  return new Date(milliSecs).toLocaleDateString()
}

export const createDate = (date, days, weeks, months, years) => {
  let newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days + 7 * weeks)
  newDate.setMonth(newDate.getMonth() + months)
  newDate.setFullYear(newDate.getFullYear() + years)

  return newDate
}