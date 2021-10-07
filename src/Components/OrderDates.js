
const sortObject = (unordered) => {
  const ordered = Object.keys(unordered).sort().reduce(
    (obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
  return ordered
}

export default sortObject