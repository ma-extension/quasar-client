<template>
  <q-page id="index" class="flex flex-center">
    <ListReader />
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
  name: 'PageIndex'
}
</script>
