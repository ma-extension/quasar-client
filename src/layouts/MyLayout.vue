<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-black">
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <q-btn
          icon="favorite"
          flat
          rounded
          no-caps
          label="Github"
          @click="tabview"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      title: 'Manga Agenda Extension',
      tabview: '',
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
