function getDate() {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.toLocaleDateString('default', { month: 'long' });
  let day = today.getDate();

  return day + '-' + month.substring(0, 3) + '-' + year;
}

export { getDate };
