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
                  :error-messages="v$.name.$errors.map((e) => e.$message)"
                  :counter="10"
                  label="Lastname"
                  required
                  @input="v$.lastname.$touch"
                  @blur="v$.name.$touch"
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
          <v-btn color="blue-darken-1" variant="elevated" @click="v$.$validate">
            Save
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
<script setup>
import { reactive, watch, computed, ref, defineProps } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  dialog: Boolean,
});

const dialog = computed({
  get: () => props.dialog,
  set: (value) => {
    store.commit('setDialog', value); // Actualiza el estado de dialog en Vuex
  },
});

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
  return editedIndex === -1 ? 'New Item' : 'Edit Item'
})

function clear() {
  v$.value.$reset();
  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
  dialog.value = false;
}
</script>
