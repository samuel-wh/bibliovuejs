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
                  @input="v$.name.$touch"
                  @blur="v$.name.$touch"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.lastname"
                  :error-messages="v$.lastname.$errors.map((e) => e.$message)"
                  :counter="10"
                  label="Lastname"
                  required
                  @input="v$.lastname.$touch"
                  @blur="v$.lastname.$touch"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="state.email"
                  :error-messages="v$.email.$errors.map((e) => e.$message)"
                  label="E-mail"
                  required
                  @input="v$.email.$touch"
                  @blur="v$.email.$touch"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="elevated" @click="clear">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-1" variant="elevated" @click="save">
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

const props = defineProps({
  desserts: Array,
});
const { desserts } = toRefs(props);
const dialog = ref(false);

const editedIndex = ref(-1);

const initialState = {
  name: "",
  lastname: "",
  email: "",
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  lastname: { required },
  email: { required, email },
};

const v$ = useVuelidate(rules, state);

/** WATCHERS */
watch(dialog, (val) => {
  val || clear()
})


/** COMPUTEDS */
const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})

const clear = () => {
  v$.value.$reset();
  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
  dialog.value = false;
  editedIndex.value = -1
}

const save = () => { };

const editItem = (item) => {
  editedIndex.value = desserts.value.indexOf(item);
  // editedItem.value = { ...item };
  dialog.value = true;
};

defineExpose({ editItem });
</script>
