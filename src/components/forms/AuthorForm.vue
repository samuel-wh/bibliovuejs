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
                  variant="outlined"
                />
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
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.email"
                  :error-messages="v$.email.$errors.map((e) => e.$message)"
                  label="E-mail"
                  required
                  @input="v$.email.$touch()"
                  @blur="v$.email.$touch()"
                  variant="outlined"
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
import { ref, toRefs, computed, reactive, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { postAuthors, patchAuthors, deleteAuthors } from "@/services/authorsApi";

/*----------------------- Variables ----------------------*/
const props = defineProps({
  desserts: Array,
});

const { desserts } = toRefs(props);
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
/*--------------------- END Variables --------------------*/


/*----------------------- Watchers -----------------------*/
watch(dialog, (val) => {
  val || clear();
});
/*--------------------- END Watchers --------------------*/


/*----------------------- Computeds ---------------------*/
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "Nuevo Autor" : "Editar Autor";
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
    patchAuthors(desserts, state);
  } else {
    postAuthors(desserts, state);
  }
  clear();
};

const editItem = (item) => {
  v$.value.$reset();
  editedIndex.value = desserts.value.indexOf(item);
  Object.assign(state, item);
  dialog.value = true;
};
/*----------------------- END Funcitions ---------------------*/


defineExpose({ editItem, deleteAuthors });
</script>
