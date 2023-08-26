export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const fecha = new Date(dateString);
  return fecha.toLocaleDateString('es-ES', options);
};

export const formatDateISO = (dateString) => {
  // Dividimos la fecha en sus partes: día, mes y año
  const partesFecha = dateString.split('/');

  // Aseguramos que el mes y el día tengan dos dígitos
  const dia = partesFecha[0].padStart(2, '0');
  const mes = partesFecha[1].padStart(2, '0');
  const anio = partesFecha[2];

  // Formateamos la fecha en el formato ISO 8601 (YYYY-MM-DDTHH:mm)
  const fechaISO8601 = `${anio}-${mes}-${dia}T00:00`;

  return fechaISO8601;
}
