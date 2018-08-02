<template>
  <nav class="navbar navbar-bottom navbar-expand-md navbar-light fixed-bottom">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" v-if="status.onLoading">
        <a class="nav-link" href="#">Loading ...</a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#"></a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      status: {
        onLoading: false
      }
    }
  },
  mounted () {
    // this.navbar = this.$store.state.navbar
  }
}
</script>

