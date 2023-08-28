<template>
  <list-books :title="title" :tableHeaders="tableHeaders"/>
</template>

<script>

// Components
import ListBooks from '@/components/pages/ListBooks.vue';

export default {
  name: 'BooksView',

  components: {
    ListBooks,
  },
  data: () => ({
    title: "Lista de Libros",
    tableHeaders: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
      },
      { title: 'Titulo', key: 'title' },
      { title: 'Editorial', key: 'publisher.name' },
      { title: 'Autores', key: 'books_authors' },
      { title: 'Fecha de Publicacion', key: 'pubDate'},
      { title: 'Actions', key: 'actions', sortable: false },
    ],

  }),
}
</script>
