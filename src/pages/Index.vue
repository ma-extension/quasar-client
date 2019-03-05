<template>
  <q-page id="index" class="">
    <q-header elevated class="bg-red-10">
      <q-toolbar>
        <q-btn
          icon="arrow_back"
          round
          flat
          v-if="!isHomePanel()"
          @click="backPanel()"
        />
        <q-toolbar-title>
          {{ this.title }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <ListReader :tabview="panel" @clickReader="(e) => clickReader(e)" />
  </q-page>
</template>

<style>
#index {
  width: 300px;
}
</style>

<script>
import ListReader from '../components/ListReader.vue'
export default {
  components: {
    ListReader
  },
  name: 'PageIndex',
  data () {
    return {
      maintitle: 'Manga Agenda Extension',
      parentPanel: '',
      panel: 'readers',
      parent: {}
    }
  },
  computed: {
    title () {
      if (this.isHomePanel()) {
        return this.maintitle
      }
      return this.parent.title
    }
  },
  methods: {
    clickReader (element) {
      this.parentPanel = element.parentPanel
      this.panel = element.panel
      this.parent = element
    },
    backPanel () {
      this.panel = this.parentPanel
    },
    isHomePanel () {
      return (this.panel === 'readers') ? true : false
    }
  }
}
</script>
