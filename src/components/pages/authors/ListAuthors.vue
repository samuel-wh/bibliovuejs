<template>
  <v-data-table :headers="tableHeaders" :items="desserts" :sort-by="[{ key: 'calories', order: 'asc' }]" class="elevation-3">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn  color="indigo-darken-1" dark class="mb-2" v-bind="props" variant="elevated">
              New Item
            </v-btn>
          </template>
          <v-card class='p-3'>
            <v-card-title>
              <span class="text-h5"> Agregar Autor</span>
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
        <v-dialog class='text-center' v-model="dialogDelete" max-width="600px">
          <v-card class='p-3'>
            <v-card-title class="text-h5">¿Está seguro de que desea eliminar este elemento?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="elevated" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="elevated" @click="deleteItemConfirm">Si, Estoy Seguro</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon color='teal-darken-1' size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon color='red-darken-1' size="small" @click="deleteItem(item.raw)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from 'axios';

export default {
  props: {
    apiUrl: String,
    title: String,
    tableHeaders: Array,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      lastName: '',
      email: '',
    },
    defaultItem: {
      name: '',
      lastName: '',
      email: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const response = await axios.get(this.apiUrl);
        this.desserts = response.data; // Asignar los datos de la API a la propiedad 'desserts'
        console.log(this.desserts);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.$swal('Hello Vue world!!!');
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
