// eslint-disable-next-line @typescript-eslint/no-unused-vars

const localeDate = (date: Date): string => {
  const options = {
    year: "numeric",
    month: "long" || "short" || "numeric",
    weekday: "long" || "short",
    day: "numeric",
  };

  return date.toLocaleDateString("pt-br", options);
};

export function converterStringParaData(dataString) {
  // Divida a string em partes: data e hora

  var partes = dataString.split(" ");

  // Divida a parte da data em ano, mês e dia
  var dataPartes = partes[0].split("-");

  // Divida a parte da hora em horas e minutos
  var horaPartes = partes[1].split(":");

  // Crie um novo objeto Date
  // Mês no JavaScript começa do 0, então subtraia 1 do mês
  var data = new Date(
    dataPartes[0],
    dataPartes[1] - 1,
    dataPartes[2],
    horaPartes[0],
    horaPartes[1]
  );

  // Verifique se a data é válida
  if (isNaN(data.getTime())) {
    // Se a data não for válida, crie uma data padrão (hoje)
    data = new Date();
  }

  return data;
}

export const serialize = <T, R>(
  data: T[],
  mapper?: (item: T) => Partial<R>
): R[] => {
  return data.map(mapper as (item: T) => R);
};

export default localeDate;
