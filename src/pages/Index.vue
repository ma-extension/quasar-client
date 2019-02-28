<template>
  <q-page id="index" class="flex flex-center">
    <q-list bordered class="rounded-borders">
      <q-expansion-item>
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://onepiece-ex.com.br/favicon/favicon-32x32.png" alt="">
          </q-avatar>
        </q-item-section>
        <q-item-section>onepiece-ex</q-item-section>
      </template>
        <q-card>
          <q-list>
            <q-expansion-item
              label="One Piece"
            >
              <q-list>
                <q-item>cap1</q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        icon="signal_wifi_off"
        label="Wifi settings"
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<style>
#index {
  width: 300px;
}
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
