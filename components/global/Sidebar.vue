<template>
  <div class="sidebar">
    <div class="sidebar-title">
      {{ $store.state.settings.name || 'BUILDER' }}
    </div>
    <div class="sidebar-avatar">
      <div class="avatar-image">
        <img src="https://dummyimage.com/200x200/527eff/fff" alt="Avatar" class="rounded-circle">
      </div>
      <div class="avatar-name">
        John Doe
      </div>
    </div>
    <nuxt-link
      v-for="item in sidebar"
      :key="item.key"
      :to="item.url"
      class="sidebar-link"
      v-bind:class="{ 'sidebar-link_active': item.url === currentURL }"
    >
      {{ item.title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sidebar: [{
        url: '/',
        title: 'Dashboard'
      }, {
        url: '/components/',
        title: 'Components'
      }, {
        url: '/studio/',
        title: 'Studio'
      }, {
        url: '/synchronize',
        title: 'Synchronize'
      }, {
        url: '/settings',
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

