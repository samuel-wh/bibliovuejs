<template>
  <v-dialog class="text-center" v-model="dialogDelete" max-width="600px">
    <v-card class="p-3">
      <v-card-title class="text-h5">¿Está seguro de que desea eliminar este elemento?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="elevated" @click="closeDelete">Cancelar</v-btn>
        <v-btn color="blue-darken-1" variant="elevated" @click="deleteItemConfirm">Si, Estoy Seguro</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialogDelete: false,
  }),
  methods: {
    closeDelete() {
      this.dialogDelete = false
    },

    deleteItemConfirm() {
      this.closeDelete()
    },

  }
}
</script>
