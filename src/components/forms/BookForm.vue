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
        Añadir Libro
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
                  v-model="state.title"
                  :error-messages="v$.title.$errors.map((e) => e.$message)"
                  :counter="10"
                  label="Titulo"
                  required
                  @input="v$.title.$touch()"
                  @blur="v$.title.$touch()"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="state.publisherId"
                  :error-messages="v$.publisherId.$errors.map((e) => e.$message)"
                  label="Ediorial"
                  required
                  :items="pubList"
                  @input="v$.publisherId.$commit()"
                  @blur="v$.publisherId.$commit()"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.pubDate"
                  :error-messages="v$.pubDate.$errors.map((e) => e.$message)"
                  label="Fecha de publicacion"
                  required
                  variant="outlined"
                  type="datetime-local"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  v-model="state.authorIds"
                  :error-messages="v$.authorIds.$errors.map((e) => e.$message)"
                  label="Autores"
                  required
                  :items="authorsList"
                  variant="outlined"
                  @input="v$.authorIds.$touch()"
                  @blur="v$.authorIds.$touch()"
                  multiple
                  chips
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="red-lighten-1" variant="elevated" @click="clear">
            Cancelar
          </v-btn>
          <v-btn color="green-lighten-1" variant="elevated" @click="save">
            Guardar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script setup>
import { ref, toRefs, computed, reactive, watch, defineEmits } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { getPublishers } from "@/services/publishersApi";
import { getAuthors } from "@/services/authorsApi";
import { deleteBooks, postBooks, patchBooks } from "@/services/booksApi";
import { formatDateISO } from "@/utils/dateUtils";

/*----------------------- Variables ----------------------*/
const props = defineProps({
  desserts: Array,
});

const { desserts } = toRefs(props);
const dialog = ref(false);

const { emit } = defineEmits(["enviar-dato"]);
const editedIndex = ref(-1);

const initialState = {
  title: "",
  publisherId: "",
  pubDate: "",
  authorIds: [],
};

var state = reactive({
  ...initialState,
});

const rules = {
  title: { required },
  publisherId: { required },
  pubDate: { required },
  authorIds: { required },
};

const v$ = useVuelidate(rules, state);

const pubList = ref([]);
const authorsList = ref([]);
/*--------------------- END Variables --------------------*/


/*----------------------- Watchers -----------------------*/
watch(dialog, (val) => {
  val || clear();
});
/*--------------------- END Watchers --------------------*/


/*----------------------- Computeds ---------------------*/
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "Nuevo Libro" : "Editar Libro";
});
/*--------------------- END Computeds --------------------*/


/*----------------------- Functions ---------------------*/
const clear = () => {
  v$.value.$reset();
  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
  dialog.value = false;
  editedIndex.value = -1;
};

const save = () => {
  if (editedIndex.value > -1) {
    patchBooks(desserts, state);
  } else {
    postBooks(desserts, state);
  }
  clear();
};

const editItem = (item) => {
  v$.value.$reset();
  editedIndex.value = desserts.value.indexOf(item);

  // Extraer solo las propiedades necesarias de 'item'
  const { createdAt, publisher, books_authors, ...dataToUpdate } = item;

  // Obtener un array de IDs de autores
  const authorIds = books_authors.map((author) => author.id);

  // Actualizar 'state' con las propiedades extraídas
  Object.assign(state, {
    ...dataToUpdate,
    authorIds,
    pubDate: formatDateISO(dataToUpdate.pubDate),
  });
  console.log(state);

  dialog.value = true;
};

const fillSelects = async () => {
  const publishers = await getPublishers();
  publishers.forEach((ele) => {
    pubList.value.push({
      title: ele.name,
      value: ele.id,
    });
  });

  const authors = await getAuthors();
  authors.forEach((ele) => {
    authorsList.value.push({
      title: ele.name,
      value: ele.id,
    });
  });
};
fillSelects();
/*----------------------- END Funcitions ---------------------*/

defineExpose({ editItem, deleteBooks });
</script>
