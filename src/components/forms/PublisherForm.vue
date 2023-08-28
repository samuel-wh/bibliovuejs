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
        Añadir Editorial
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
                  label="Nombre"
                  required
                  @input="v$.name.$touch()"
                  @blur="v$.name.$touch()"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.address"
                  :error-messages="v$.address.$errors.map((e) => e.$message)"
                  :counter="10"
                  label="Direccion"
                  required
                  @input="v$.address.$touch()"
                  @blur="v$.address.$touch()"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.city"
                  :error-messages="v$.city.$errors.map((e) => e.$message)"
                  label="Ciuidad"
                  required
                  @input="v$.city.$touch()"
                  @blur="v$.city.$touch()"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.state"
                  :error-messages="v$.state.$errors.map((e) => e.$message)"
                  label="Estado"
                  required
                  @input="v$.state.$touch()"
                  @blur="v$.state.$touch()"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.country"
                  :error-messages="v$.country.$errors.map((e) => e.$message)"
                  label="Pais"
                  required
                  @input="v$.country.$touch()"
                  @blur="v$.country.$touch()"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.website"
                  :error-messages="v$.website.$errors.map((e) => e.$message)"
                  label="Pagina web"
                  required
                  @input="v$.website.$touch()"
                  @blur="v$.website.$touch()"
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
import { required } from "@vuelidate/validators";
import { postPublishers, patchPublishers, deletePublishers } from "@/services/publishersApi";

/*----------------------- Variables ----------------------*/
const props = defineProps({
  desserts: Array,
});

const { desserts } = toRefs(props);
const dialog = ref(false);

const editedIndex = ref(-1);

const initialState = {
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  website: "",
};

var state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  address: { required },
  city: { required },
  state: { required },
  country: { required },
  website: { required },
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
  return editedIndex.value === -1 ? "Nueva Editorial" : "Editar Editorial";
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
    patchPublishers(desserts, state);
  } else {
    postPublishers(desserts, state);
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


defineExpose({ editItem, deletePublishers });
</script>
