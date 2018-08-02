<template>
  <el-menu mode="horizontal">
    <el-row :gutter="0" type="flex" class="row-bg" justify="center">
      <el-col :span="10" align="center">
        <el-menu-item index="1">
          {{ title }}
        </el-menu-item>
      </el-col>
    </el-row>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      sidebar: true,
      title: 'Dashboard'
    }
  },
  computed: {
    getTitle () {
      return this.$store.state.title
    }
  },
  watch: {
    getTitle (newValue) {
      this.title = newValue
    }
  }
}
</script>

