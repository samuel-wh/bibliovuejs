<template>
  <v-dialog class="text-center" v-model="dialogDelete" max-width="600px">
    <v-card class="p-3">
      <v-card-title class="text-h5"
        >¿Está seguro de que desea eliminar este elemento?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="elevated" @click="closeDelete"
          >Cancelar</v-btn
        >
        <v-btn
          color="blue-darken-1"
          variant="elevated"
          @click="deleteItemConfirm(deleteIndex)"
          >Si, Estoy Seguro</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, toRefs, defineProps } from "vue";
import axios from "axios";

const props = defineProps({
  desserts: Array,
  apiUrl: String,
});
const { desserts, apiUrl } = toRefs(props);
const dialogDelete = ref(false);
const deleteIndex = ref(-1);

const closeDelete = () => {
  dialogDelete.value = false;
  deleteIndex.value = -1;
};

const deleteItem = (item) => {
  dialogDelete.value = true;
  deleteIndex.value = item.id;
};

const deleteItemConfirm = async (deleteIndex) => {
  if (deleteIndex.value > -1) {
    const response = await axios.delete(`${apiUrl.value}/${deleteIndex.value}`);
    if (response.status === 204) {
      desserts.value.splice(deleteIndex.value, 1);
    }
  }
  closeDelete();
};
defineExpose({ deleteItem });
</script>
