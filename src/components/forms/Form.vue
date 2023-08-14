<template>
  <v-dialog v-model="dialog" max-width="700px" persistent>
    <template v-slot:activator="{ props }">
      <v-btn color="indigo-darken-1" dark class="mb-2" v-bind="props" variant="elevated">
        {{ titleButon }}
      </v-btn>
    </template>
    <v-card class='p-3'>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.lastName" label="Apellido"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="elevated" @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue-darken-1" variant="elevated" @click="save">
          Save
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    titleButon: String,
    formTitle: String,
    editedItem: Object,
  },
  data: () => ({
    editedItem: this.editedItem,
  }),
}
</script>
