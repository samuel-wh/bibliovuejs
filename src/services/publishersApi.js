import { formatDate } from "@/utils/dateUtils";
import axios from "axios";
import Swal from "sweetalert2";

const url = "http://localhost:3003/api/v1/publishers"

/**
 *
 * @returns
 */
export const getPublishers = async () => {
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


export const postPublishers = async (desserts, state) => {
  try {
    const response = await axios.post(url, state);
    if (response.status === 201) {
      let publisher = response.data
      publisher.createdAt = formatDate(publisher.createdAt)
      desserts.value.push({ ...publisher });
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

export const patchPublishers = async (desserts, state) => {
  try {
    const { id, books, createdAt, ...dataToUpdate } = state;
    const response = await axios.patch(
      `${url}/${id}`,
      dataToUpdate
    );
    if (response.status === 200) {
      // Encuentra el índice del elemento modificado en la matriz desserts
      const index = desserts.value.findIndex((item) => item.id === state.id);
      if (index !== -1) {
        let publisher = response.data
        publisher.createdAt = formatDate(publisher.createdAt)
        // Actualiza el elemento modificado en la matriz desserts
        desserts.value[index] = { ...publisher };
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


export const deletePublishers = async (desserts, item, editedIndex) => {
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
        console.log(editedIndex.value);
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
