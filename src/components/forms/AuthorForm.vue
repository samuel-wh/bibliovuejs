<template>
  <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ props }">
      <v-btn
        color="indigo-darken-1"
        dark
        class="mb-2"
        v-bind="props"
        variant="elevated"
      >
        Añadir Autor
      </v-btn>
    </template>
    <form>
      <v-card class="p-3">
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.name"
                  :error-messages="v$.name.$errors.map((e) => e.$message)"
                  :counter="10"
                  label="Name"
                  required
                  @input="v$.name.$touch()"
                  @blur="v$.name.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.lastName"
                  :error-messages="v$.lastName.$errors.map((e) => e.$message)"
                  :counter="10"
                  label="Lastname"
                  required
                  @input="v$.lastName.$touch()"
                  @blur="v$.lastName.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.email"
                  :error-messages="v$.email.$errors.map((e) => e.$message)"
                  label="E-mail"
                  required
                  @input="v$.email.$touch()"
                  @blur="v$.email.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-lighten-1" variant="elevated" @click="clear">
            Cancel
          </v-btn>
          <v-btn color="green-lighten-1" variant="elevated" @click="save">
            Save
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script setup>
import { ref, toRefs, computed, reactive, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import axios from "axios";
import Swal from "sweetalert2";

/* VARIABLES */
const props = defineProps({
  desserts: Array,
  apiUrl: String,
});

const { desserts, apiUrl } = toRefs(props);
const dialog = ref(false);

const editedIndex = ref(-1);

const initialState = {
  name: "",
  lastName: "",
  email: "",
};

var state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  lastName: { required },
  email: { required, email },
};

const v$ = useVuelidate(rules, state);
/* END VARIABLES */

/* WATCHERS */
watch(dialog, (val) => {
  val || clear();
});
/*END WATCHERS */

/* COMPUTEDS */
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "Nuevo Autor" : "Editar Autor";
});
/* END COMPUTEDS */

const clear = () => {
  v$.value.$reset();
  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
  dialog.value = false;
  editedIndex.value = -1;
};

const patchItem = async () => {
  try {
    const { id, createdAt, ...dataToUpdate } = state;
    const response = await axios.patch(
      `${apiUrl.value}/${state.id}`,
      dataToUpdate
    );
    if (response.status === 200) {
      // Encuentra el índice del elemento modificado en la matriz desserts
      const index = desserts.value.findIndex((item) => item.id === state.id);
      if (index !== -1) {
        // Actualiza el elemento modificado en la matriz desserts
        desserts.value[index] = { ...response.data };
      }
    }
  } catch (error) {
    console.error("Error making PATCH request:", error);
  }
};

const postItem = async () => {
  try {
    const response = await axios.post(apiUrl.value, state);
    if (response.status === 201) {
      desserts.value.push({ ...response.data });
    }
  } catch (error) {
    console.error("Error making POST request::", error);
  }
};

const save = () => {
  if (editedIndex.value > -1) {
    patchItem();
  } else {
    postItem();
  }
  clear();
};

const editItem = (item) => {
  v$.value.$reset();
  editedIndex.value = desserts.value.indexOf(item);
  Object.assign(state, item);
  dialog.value = true;
};

const deleteItem = async (item) => {
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
      const response = await axios.delete(`${apiUrl.value}/${item.id}`);
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
      text: "An error occurred while deleting the item.",
      icon: "error",
    });
  }
};

defineExpose({ editItem, deleteItem });
</script>
