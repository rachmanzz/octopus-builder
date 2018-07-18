<template>
  <div class="content">
    <Navbar :data="navbar"/>
    <div class="content-inner">
      Studio
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'Studio'
      }
    }
  },
  mounted () {
    // do stuff
  }
}
</script>