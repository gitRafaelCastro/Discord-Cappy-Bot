function stringLimiter(str, maxLength = 256) {
  if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';
  }
  return str;
}

function randomRGB() {
  // Gera valores aleatórios para R, G e B entre 0 e 255
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Retorna o valor RGB no formato especificado
  return [r, g, b];
}

module.exports = {
  stringLimiter,
  randomRGB
}