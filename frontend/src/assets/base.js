function getDate(d) {
  const date = new Date(d);

  let year = date.getFullYear();
  let month = date.toLocaleDateString('default', { month: 'long' });
  let day = date.getDate();

  day = day < 10 ? ('0' + day).substring(0, 2) : day;

  return day + '-' + month.substring(0, 3) + '-' + year;
}

function getMax(x, y) {
  if (!x) return new Date(y);
  if (!y) return new Date(x);

  const d1 = new Date(x);
  const d2 = new Date(y);

  return d1 > d2 ? d1 : d2;
}

export { getDate, getMax };
