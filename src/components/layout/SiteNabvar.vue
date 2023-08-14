<template>
  <v-avatar color="grey-darken-1" class="hidden-md-and-up" size="32"></v-avatar>

  <v-spacer></v-spacer>

  <v-tabs centered color="grey-darken-2">
    <v-tab
      v-for="link in links"
      :key="link.text"
      :text="link.text"
      :to="{ name: link.to }"
    ></v-tab>
  </v-tabs>
  <v-spacer></v-spacer>

  <v-avatar
    class="hidden-sm-and-down"
    color="grey-darken-1"
    size="32"
  ></v-avatar>
</template>

<script setup>
const links = [
  { text: "Libros", to: "books" },
  { text: "Autores", to: "authors" },
  { text: "Editoriales", to: "publishers" },
];
</script>
