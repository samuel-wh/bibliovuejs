<template>
  <v-data-table
    :headers="tableHeaders"
    :items="desserts"
    :sort-by="[{ key: 'id', order: 'asc' }]"
    class="elevation-3"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <PublisherForm ref="formRef" :desserts="desserts" :api-url="apiUrl" />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        color="teal-darken-1"
        size="small"
        class="me-2"
        @click="callEditItem(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon color="red-darken-1" size="small" @click="callDeleteItem(item.raw)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, toRefs, defineProps } from "vue";
import axios from "axios";
import PublisherForm from "../forms/PublisherForm.vue";

const props = defineProps({
  apiUrl: String,
  title: String,
  tableHeaders: Object,
});

const { apiUrl, tableHeaders, title } = toRefs(props);

const desserts = ref([]);

const initialize = async () => {
  try {
    const response = await axios.get(apiUrl.value);
    desserts.value = response.data;
    console.log(desserts.value);
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }
};

const formRef = ref(null);
const callEditItem = (item) => {
  formRef.value.editItem(item);
};

const callDeleteItem = (item) => {
  formRef.value.deleteItem(item);
};

initialize();
</script>
