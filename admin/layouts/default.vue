<template>
  <div class="main">
    <MainMenu />
    <nuxt />
  </div>
</template>

<script>
import MainMenu from '~/components/MainMenu.vue'

export default {
  components: {
    MainMenu
  }
}
</script>
