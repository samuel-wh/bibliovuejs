<template>
  <ListPublishers :title="title" :tableHeaders="tableHeaders"/>
</template>

<script>

// Components
import ListPublishers from '@/components/pages/ListPublishers.vue';

export default {
  name: 'AuthorsView',

  components: {
    ListPublishers,
  },
  data: () => ({
    title: "Lista de Editoriales",
    tableHeaders: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
      },
      { title: 'Nombre', key: 'name' },
      { title: 'Direccion', key: 'address' },
      { title: 'Ciudad', key: 'city' },
      { title: 'Estado', key: 'state' },
      { title: 'Pais', key: 'country' },
      { title: 'Pagina Web', key: 'website' },
      { title: 'Fecha de creacion', key: 'createdAt' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],

  }),
}
</script>
