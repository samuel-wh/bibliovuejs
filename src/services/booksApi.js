import axios from "axios";
import Swal from "sweetalert2";
import { formatDate } from "@/utils/dateUtils"

const url = "http://localhost:3003/api/v1/books"

/**
 * Hace una peticion de tipo GET para obtener la lista
 * de libros
 *
 * @returns response {Array} Lista de los libros
 */
export const getBooks = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
    });
  }
}


/**
 * Hace una peticion POST para agregar un nuevo libro
 *
 * @param {Array} desserts Lista de los libros en memoria
 * @param {Object} state Objecto con datos del libro nuevo
 */
export const postBooks = async (desserts, state) => {
  try {
    const response = await axios.post(url, state);
    if (response.status === 201) {
      const book = await axios.get(`${url}/${response.data.id}`);
      if (book.status === 200) {
        book.data.pubDate = formatDate(book.data.pubDate)
        desserts.value.push({ ...book.data });
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
    });
  }
};

/**
 * Realiza una peticion de tipo PATCH para editar un libro
 *
 * @param {Array} desserts Lista de los libros en memoria
 * @param {Object} state Objecto con datos editados del libro
 */
export const patchBooks = async (desserts, state) => {
  try {
    const { id, ...dataToUpdate } = state
    const response = await axios.patch(
      `${url}/${id}`,
      dataToUpdate
    );
    if (response.status === 200) {
      // Encuentra el índice del elemento modificado en la matriz desserts
      const bookResponse = await axios.get(`${url}/${response.data.id}`);
      if (bookResponse.status === 200) {
        const book = bookResponse.data
        const index = desserts.value.findIndex((item) => item.id === state.id);
        if (index !== -1) {
          book.pubDate = formatDate(book.pubDate);
          // Actualiza el elemento modificado en la matriz desserts
          desserts.value[index] = { ...book };
        }
      }
    }
  } catch (error) {
    console.error("Error making PATCH request:", error);
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
    });
  }
};

/**
 * Realiza una peticion DELETE para eliminar un libro
 *
 * @param {Array} desserts Lista de los libros en memoria
 * @param {Object} item Objeto del libro a eliminar
 * @param {Integer} editedIndex Indice del libro a eliminar
 */
export const deleteBooks = async (desserts, item, editedIndex) => {
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

