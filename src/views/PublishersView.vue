<template>
  <ListAuthors :title="title" :table-headers="tableHeaders" :api-url="apiUrl"/>
</template>

<script>

// Components
import ListAuthors from '../components/pages/authors/ListAuthors.vue';

export default {
  name: 'AuthorsView',

  components: {
    ListAuthors,
  },
  data: () => ({
    apiUrl: "http://localhost:3003/api/v1/authors",
    title: "Lista de Autores",
    tableHeaders: [
      {
        title: 'Nombre',
        align: 'start',
        sortable: false,
        key: 'name',
      },
      { title: 'Apellido', key: 'lastName' },
      { title: 'Email', key: 'email' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],

  }),
}
</script>
