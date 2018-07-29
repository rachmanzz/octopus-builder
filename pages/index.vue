<template>
  <div class="content">
    <Navbar :data="navbar" />
    <div class="container content-inner">
      <div class="card card-table">
        <div class="card-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate expedita laboriosam, possimus placeat nam nesciunt vel repellendus voluptatem reiciendis. Atque natus sint quis nulla aut, perferendis placeat cupiditate blanditiis rem.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/global/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'Home'
      }
    }
  }
}
</script>
