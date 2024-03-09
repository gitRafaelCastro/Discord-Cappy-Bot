module.exports.formatMS_HHMMSS = function (num) {
  return [86400000, 3600000, 60000, 1000, 1].reduce((p, c) => {
      let res = ~~(num / c);
      num -= res * c;
      return [...p, res];
  }, [])
  .map((v, i) => i <= 1 && v === 0 ? undefined : [ i === 4 ? "." : "", v < 10 ? `0${v}` : v, [" Days, ", ":", ":", "", ""][i]].join(""))
  .filter(Boolean)
  .slice(0, -1)
  .join("");
}

module.exports.delay = async (ms) => new Promise(r => setTimeout(() => r(true), ms));