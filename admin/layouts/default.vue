<template>
  <div class="main">
    <Sidebar />
    <nuxt />
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>
