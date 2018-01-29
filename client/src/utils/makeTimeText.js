const addZeroIfNeed = (time) => time < 10 ? "0" + time : time;

const makeTimeText = (args) => {
  const timeTexts = args.map((time) => {
    if(!time) { return ''}
    const date = new Date(time);
    const hours = addZeroIfNeed(date.getHours());
    const minutes = addZeroIfNeed(date.getMinutes());
    return hours + ':' + minutes
  })
  return timeTexts.join(' - ');
}

export default makeTimeText;