<template>
  <nav class="navbar navbar-expand-md navbar-light">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span class="ion-android-arrow-back"></span>
        </a>
      </li>
    </ul>
    <ul class="navbar-nav mx-auto">
      <li class="nav-title">{{ data.title }}</li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li v-if="data.create" class="nav-item">
        <div class="btn btn-success" @click="triggerCreate">Create</div>
      </li>
      <li v-if="data.publish" class="nav-item">
        <div class="btn btn-info" @click="triggerPublish">Publish</div>
      </li>
      <li v-if="data.refresh" class="nav-item">
        <div class="btn btn-primary" @click="triggerRefresh">Refresh</div>
      </li>
      <li v-if="data.save" class="nav-item">
        <div class="btn btn-success" @click="triggerSave">Save</div>
      </li>
      <li v-else class="nav-item">
        <div class="nav-link">&nbsp;</div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['data', 'create', 'publish', 'refresh', 'sync', 'save'],
  methods: {
    triggerCreate () {
      this.create()
    },
    triggerPublish () {
      this.publish()
    },
    triggerRefresh () {
      this.refresh()
    },
    triggerSave () {
      this.save()
    }
  }
}
</script>

