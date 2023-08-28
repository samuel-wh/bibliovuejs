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
        <publisher-form ref="formRef" :desserts="desserts" />
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
import PublisherForm from "../forms/PublisherForm.vue";
import { getPublishers } from "@/services/publishersApi"
import { formatDate } from "@/utils/dateUtils"

const props = defineProps({
  title: String,
  tableHeaders: Object,
});

const { tableHeaders, title } = toRefs(props);

const desserts = ref([]);
const editedIndex = ref(-1);

const initialize = async () => {
  const publishers = await getPublishers();
  publishers.forEach(publisher => {
    publisher.createdAt = formatDate(publisher.createdAt);
  });
  desserts.value = publishers;
};

const formRef = ref(null);
const callEditItem = (item) => {
  formRef.value.editItem(item);
};

const callDeleteItem = (item) => {
  formRef.value.deletePublishers(desserts, item, editedIndex);
};

initialize();
</script>
