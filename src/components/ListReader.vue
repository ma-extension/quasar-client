<template>
  <div
    class="full-width full-height"
  >
    <q-tab-panels
      v-model="panel"
      animated
      class="full-width full-height"
    >
      <q-tab-panel
        name="readers"
      >
        <q-list bordered class="rounded-borders full-width">
          <q-item clickable v-for="(reader, index) in items" :key="index" @click="preparePanelMangas(reader.mangas)">
        
            <q-item-section avatar>
              <q-avatar>
                <img :src="reader.icon">
              </q-avatar>
            </q-item-section>
            <q-item-section>{{ reader.reader }}</q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel
        name="mangas"
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
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: [
    'historyBy'
  ],
  data () {
    return {
      panel: 'readers',
      items: [],
      mangas: [],
      current_hostname: null
    }
  },
  methods: {
    preparePanelMangas(mangas) {
      this.mangas = mangas
      this.panel = 'mangas'
    }
  },
  mounted () {
    this.$store.dispatch('reader/get_last_readers').then(resp => {
      this.items = resp
    })
  },
  computed: {
    readers () {
      return this.items
    }
  }
}
</script>

<style>
</style>
