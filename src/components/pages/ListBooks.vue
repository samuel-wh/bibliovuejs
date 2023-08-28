<template>
  <v-data-table
    :headers="tableHeaders"
    :items="desserts"
    :sort-by="[{ key: 'id', order: 'desc' }]"
    class="elevation-3"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <book-form ref="formRef" :desserts="desserts" />
      </v-toolbar>
    </template>
    <template v-slot:item.books_authors="{ item }">
      <span v-for="(author, index) in item.raw.books_authors" :key="index">
        {{ author.name }} {{ author.lastName }}
        <br>
      </span>
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
import BookForm from "../forms/BookForm.vue";
import { getBooks } from "@/services/booksApi"
import { getPublishers } from "@/services/publishersApi"
import { formatDate } from "@/utils/dateUtils"

const props = defineProps({
  apiUrl: String,
  title: String,
  tableHeaders: Object,
});

const { tableHeaders, title } = toRefs(props);

const desserts = ref([]);
const editedIndex = ref(-1);

const initialize = async () => {
  const books = await getBooks();
  books.forEach(book => {
    book.pubDate = formatDate(book.pubDate);
  });
  desserts.value = books;
}


const formRef = ref(null);
const callEditItem = (item) => {
  formRef.value.editItem(item);
};

const callDeleteItem = (item) => {
  formRef.value.deleteBooks(desserts, item, editedIndex);
};
initialize();
</script>
