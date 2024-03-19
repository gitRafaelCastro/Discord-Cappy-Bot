function convertToDuration(ms) {
  // Calcula as horas, minutos e segundos
  const horas = Math.floor(ms / 3600000);
  const minutos = Math.floor((ms % 3600000) / 60000);
  const segundos = Math.floor((ms % 60000) / 1000);

  // Formata a duração
  let duracaoFormatada = "";
  if (horas > 0) {
    duracaoFormatada += `${adicionarZeroEsquerda(horas)}:`;
  }
  duracaoFormatada += `${adicionarZeroEsquerda(minutos)}:${adicionarZeroEsquerda(segundos)}`;

  return duracaoFormatada;
}

function adicionarZeroEsquerda(num) {
  return num < 10 ? `0${num}` : num;
}

module.exports = convertToDuration;
