<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-list>
      <q-expansion-item v-for="(manga, m_index) in mangas"
        :key="m_index"
        :label="manga.name"
      >
        <q-list>
          <q-item v-for="(cap, c_index) in manga.history"
            :key="c_index"
          >
            Cap: {{ cap.cap }}
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </q-dialog>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: [
    'items'
  ],
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    mangas () {
      return 
    }
  }
}
</script>

<style>
</style>
