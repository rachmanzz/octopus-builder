<template>
  <el-menu :router="true" :collapse="$store.state.collapse">
    <el-menu-item index="/" class="sidebar-title">
      <span slot="title">{{ $store.state.settings.name || 'BUILDER' }}</span>
    </el-menu-item>
    <el-menu-item
      :index="item.url"
      v-for="item in sidebar"
      :key="item.key"
    >
      <i :class="item.icon"></i>
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      sidebar: [{
        icon: 'el-icon-menu',
        url: '/',
        title: 'Dashboard'
      }, {
        icon: 'el-icon-news',
        url: '/layout/',
        title: 'Layout'
      }, {
        icon: 'el-icon-edit-outline',
        url: '/studio/',
        title: 'Studio'
      }, {
        icon: 'el-icon-setting',
        url: '/settings',
        title: 'Settings'
      }]
    }
  }
}
</script>

