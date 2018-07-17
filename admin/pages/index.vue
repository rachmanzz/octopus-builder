<template>
  <section class="main">
    <SecondaryMenu :data="secondary"/>
    <div class="content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, sunt veritatis sit nesciunt architecto nihil eius dolores magni voluptates ea qui. Ullam velit porro blanditiis. Sed nobis ipsa adipisci fugit.
    </div>
  </section>
</template>

<script>
import SecondaryMenu from '~/components/SecondaryMenu.vue'

export default {
  components: {
    SecondaryMenu
  },
  data () {
    return {
      secondary: {
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
