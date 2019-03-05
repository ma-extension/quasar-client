<template>
  <div
    class="list-reader"
  >
    <q-tab-panels
      v-model="panel"
      animated
      class="full-width full-height"
    >
      <q-tab-panel
        name="readers"
        style="padding: 0px;"
      >
        <q-list>
          <q-item clickable v-for="(reader, index) in items" :key="index" @click="preparePanelMangas(reader)">
        
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
        style="padding: 0px;"
      >
        <q-list>
          <q-expansion-item v-for="(manga, m_index) in mangas"
            :key="m_index"
            :label="manga.name"
            class="manga"
          >
            <q-list>
              <q-item clickable v-for="(cap, c_index) in manga.history"
                :key="c_index"
                class="manga__cap"
              >
              <q-item-section left>
                Cap: {{ cap.cap }}
              </q-item-section>
              <q-item-section main></q-item-section>
              <q-item-section right
                class="flex"
                style="align-items: center"
              >
                <q-btn
                  round
                  flat
                >
                  <q-avatar size="24px">
                    <img style="filter: invert(.8)" src="../assets/baseline-delete-24px.svg">
                  </q-avatar>
                </q-btn>
              </q-item-section>
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
    'historyBy',
    'tabview'
  ],
  data () {
    return {
      items: [],
      mangas: [],
      current_hostname: null
    }
  },
  methods: {
    preparePanelMangas(reader) {
      this.mangas = reader.mangas
      this.panelName = 'mangas'
      this.$emit('clickReader', {title: reader.reader, parentPanel: 'readers', panel: 'mangas'})
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
    },
    panel () {
      return this.tabview
    }
  }
}
</script>

<style>
.manga {
  /* font-size: 16px; */
}
.manga__cap {
  font-size: 12px;
  /* color: white; */
  /* filter: invert(100); */
  transition: .5s ease;
}
.manga__cap:hover {
  /* filter: invert(0); */
  /* background: #3db9cc; */
  /* background: wheat; */
}
</style>
