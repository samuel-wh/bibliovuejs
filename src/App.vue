<template>
  <v-app>
    <v-app-bar class="px-3" flat density="compact">
      <SiteNabvar />
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <!-- <v-footer class="text-center d-flex flex-column">
      <SiteFooter />
    </v-footer> -->
  </v-app>
</template>

<script setup>
import SiteFooter from "./components/layout/SiteFooter.vue";
import SiteNabvar from "./components/layout/SiteNabvar.vue";
</script>

<style>
</style>
