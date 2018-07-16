<template>
  <section >
    <h1 class="title">Admin Panel</h1>
    <hr>
    <div class="columns">
      <div class="column">
        <p>Synchronize any component at server Desktop <b>(localhost:8010)</b> and Mobile <b>(localhost:8020)</b></p>
        <br>
        <button class="button is-success is-rounded" v-bind:class="{ 'is-loading': onSync }" @click="sync()">
          Sync Now
        </button>
      </div>
      <div class="column">
        <article v-if="onComplete" class="message is-success">
          <div class="message-header">
            <p>Synchronization complete</p>
          </div>
          <div class="message-body">
            Synchronization completed on server Desktop and Mobile
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      onSync: false,
      onComplete: false
    }
  },
  methods: {
    sync () {
      this.onSync = true

      axios.post('/api/sync').then(res => {
        console.log(res)
        this.onSync = false
        this.onComplete = true
      })
    }
  }
}
</script>