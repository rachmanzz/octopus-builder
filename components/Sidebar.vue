<template>
  <div class="menu">
    <div class="menu-title">
      BUILDER
    </div>
    <div class="menu-avatar">
      <div class="avatar-image">
        <img src="https://dummyimage.com/200x200/527eff/fff" alt="Avatar" class="rounded-circle">
      </div>
      <div class="avatar-name">
        John Doe
      </div>
    </div>
    <nuxt-link
      v-for="item in menu"
      :key="item.key"
      :to="item.url"
      class="menu-link"
      v-bind:class="{ 'menu-link_active': item.url === currentURL }"
    >
      {{ item.title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: [{
        url: '/',
        title: 'Dashboard'
      }, {
        url: '/components/',
        title: 'Components'
      }, {
        url: '/studio/',
        title: 'Studio'
      }, {
        url: '/settings/',
        title: 'Settings'
      }],
      currentURL: ''
    }
  },
  mounted () {
    if (process.browser) {
      this.currentURL = window.location.pathname
    }
  },
  watch: {
    $route (to, from) {
      this.currentURL = to.path
    }
  }
}
</script>

