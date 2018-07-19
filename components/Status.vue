<template>
  <nav class="navbar navbar-bottom navbar-expand-md navbar-light">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" v-if="data.onLoading">
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
  props: ['data']
}
</script>

