import { formatDate } from "@/utils/dateUtils";
import axios from "axios";
import Swal from "sweetalert2";

const url = "http://localhost:3003/api/v1/authors"

/**
 * Hace una peticion GET para obtener una lista de
 * autores
 *
 * @returns {Array} Lista de Autores
 */
export const getAuthors = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error.response
        ? error.response.data.message
        : error,
      icon: "error",
    });
  }
}


/**
 * Hace una peticion POST para agregar un Autor
 *
 * @param {Array} desserts Lista de autores en memoria
 * @param {Object} state Objecto con datos del autor nuevo
 */
export const postAuthors = async (desserts, state) => {
  try {
    const response = await axios.post(url, state);
    if (response.status === 201) {
      let autor = response.data
      autor.createdAt = formatDate(autor.createdAt)
      desserts.value.push({ ...autor });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error.response
        ? error.response.data.message
        : error,
      icon: "error",
    });
  }
};

/**
 * Hace una peticion PATCH para editar un autor
 *
 * @param {Array} desserts Lista de autores en memoria
 * @param {Object} state Objeto con los datos editados
 */
export const patchAuthors = async (desserts, state) => {
  try {
    const { id, createdAt, ...dataToUpdate } = state;
    const response = await axios.patch(
      `${url}/${id}`,
      dataToUpdate
    );
    if (response.status === 200) {
      // Encuentra el índice del elemento modificado en la matriz desserts
      const index = desserts.value.findIndex((item) => item.id === state.id);
      if (index !== -1) {
        let autor = response.data
        autor.createdAt = formatDate(autor.createdAt)
        // Actualiza el elemento modificado en la matriz desserts
        desserts.value[index] = { ...autor };
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error.response
        ? error.response.data.message
        : error,
      icon: "error",
    });
  }
};


/**
 * Realiza una peticion DELETE para eliminar un autor
 *
 * @param {Array} desserts Lista de autores en memoria
 * @param {Object} item Objeto del autor a eliminar
 * @param {Integer} editedIndex Indice del autor a eliminar
 */
export const deleteAuthors = async (desserts, item, editedIndex) => {
  try {
    const result = await Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "¡Sí, bórralo!",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (result.isConfirmed) {
      // Realizar la solicitud DELETE utilizando Axios
      const response = await axios.delete(`${url}/${item.id}`);
      if (response.status === 204) {
        desserts.value.splice(editedIndex.value, 1);
      }
      // Mostrar mensaje de éxito
      Swal.fire({
        title: "Registro eliminado",
        icon: "success",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error.response
        ? error.response.data.message
        : error,
      icon: "error",
    });
  }
};
