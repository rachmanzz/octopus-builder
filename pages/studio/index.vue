<template>
  <div class="content">
    <Navbar :data="navbar" />
    <div class="content-inner">
      <div class="row">
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              Home Page
            </div>
          </div>
        </div>
      </div>
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
  }
}
</script>