export default function (dateToCheck) {
  if (new Date().setHours(0, 0, 0, 0) === dateToCheck.setHours(0, 0, 0, 0)) {
    return true;
  }
  else {
    return  false;
  }
}