export const buscarAlimento = (idAlimento, listaAlimentos) => {
  const idNumerico = Number(idAlimento);
  const alimento = listaAlimentos.find(
    (alimento) => alimento.id === idNumerico
  );
  return alimento;
};
