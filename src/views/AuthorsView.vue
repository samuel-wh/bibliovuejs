<template>
  <ListAuthorsV2 :apiUrl="apiUrl" :title="title" :tableHeaders="tableHeaders"/>
</template>

<script>

// Components
import ListAuthorsV2 from '../components/pages/authors/ListAuthorsV2.vue';

export default {
  name: 'AuthorsView',

  components: {
    ListAuthorsV2,
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
