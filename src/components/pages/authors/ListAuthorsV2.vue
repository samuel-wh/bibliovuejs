<template>
  <v-data-table
    :headers="tableHeaders"
    :items="desserts"
    :sort-by="[{ key: 'name', order: 'asc' }]"
    class="elevation-3"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <AuthorForm :dialog="dialog" @cambioVariable="actualizarVariablePadre" />

        <DialogDelete />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        color="teal-darken-1"
        size="small"
        class="me-2"
        @click="editItem(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon color="red-darken-1" size="small" @click="deleteItem(item.raw)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from "axios";
import DialogDelete from "./DialogDelete.vue";
import AuthorForm from "../../forms/AuthorForm.vue"
import { mapState } from 'vuex';


export default {
  components: {
    DialogDelete,
    AuthorForm,
  },
  props: {
    apiUrl: String,
    title: String,
    tableHeaders: Array,
  },
  data: () => ({
    dialog: false,
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      lastName: "",
      email: "",
    },
    defaultItem: {
      name: "",
      lastName: "",
      email: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState(['dialog']),
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        const response = await axios.get(this.apiUrl);
        this.desserts = response.data; // Asignar los datos de la API a la propiedad 'desserts'
        console.log(this.desserts);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.$swal("Hello Vue world!!!");
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

  },
};
</script>
