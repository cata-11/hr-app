function getDate(d) {
  const date = new Date(d);

  let year = date.getFullYear();
  let month = date.toLocaleDateString('default', { month: 'long' });
  let day = date.getDate();
  
  day = day < 9 ? ('0' + day).substring(0, 2) : day;

  return day + '-' + month.substring(0, 3) + '-' + year;
}

export { getDate };
