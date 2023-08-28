<template>
  <ListAuthors :title="title" :tableHeaders="tableHeaders"/>
</template>

<script>

// Components
import ListAuthors from '@/components/pages/ListAuthors.vue';

export default {
  name: 'AuthorsView',

  components: {
    ListAuthors,
  },
  data: () => ({
    title: "Lista de Autores",
    tableHeaders: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
      },
      { title: 'Nombre', key: 'name' },
      { title: 'Apellido', key: 'lastName' },
      { title: 'Email', key: 'email' },
      { title: 'Fecha de creacion', key: 'createdAt' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],

  }),
}
</script>
