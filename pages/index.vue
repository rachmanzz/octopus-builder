<template>
  <div class="content">
    <Navbar :data="navbar" />
    <div class="content-inner">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint eligendi repellendus dolorum facere minus nemo omnis ut delectus aperiam iste magni, doloribus natus non placeat hic, officiis voluptatem, quaerat dignissimos?
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
        title: 'Home',
        menu: [{
          url: '/',
          title: 'Home'
        }]
      }
    }
  }
}
</script>
