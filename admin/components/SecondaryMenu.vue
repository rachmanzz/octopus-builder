<template>
  <div class="secondary">
    <div class="secondary-title">
      {{ data.title }}
    </div>
    <nuxt-link v-if="data.menu" v-for="item in data.menu" :key="item.key" :to="item.url" class="secondary-item">
      {{ item.title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

