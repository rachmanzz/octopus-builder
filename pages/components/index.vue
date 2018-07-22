<template>
  <div class="content">
    <Navbar :data="navbar" :create="createComponent" :publish="publishComponent"/>
    <div class="content-inner">
      <div class="row">
        <div class="col-3" v-for="item in components" :key="item.key">
          <div class="card">
            <div class="card-body" @click="openEditor(item)">
              {{ item.fileName }}
            </div>
            <span class="ion-trash-b" @click="removeComponent(item)"></span>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="modalCreate" centered hide-header hide-footer>
      <b-form-group
        label="File Name:"
        label-for="fileName">
        <b-form-input
          id="fileName"
          type="text"
          v-model="form.fileName"
          required
          placeholder="Enter file name">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="File Path:"
        label-for="filePath">
        <b-form-input
          id="filePath"
          type="text"
          v-model="form.filePath"
          required
          placeholder="Enter file Path">
        </b-form-input>
      </b-form-group>
      <b-button variant="primary" @click="saveComponent">Submit</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'All Components',
        create: true,
        publish: true,
        menu: [{
          url: '/components/',
          title: 'Components'
        }, {
          url: '/components/publish',
          title: 'Publish'
        }, {
          url: '/components/server',
          title: 'Server'
        }]
      },
      form: {
        fileName: '',
        filePath: '/global/'
      },
      modalCreate: false,
      components: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    openEditor (file) {
      this.$router.push(`/components/editor?file=${file.name.toLowerCase()}`)
    },
    createComponent () {
      this.modalCreate = !this.modalCreate
    },
    saveComponent () {
      axios.post('/api/component/create', this.form).then(res => {
        this.form = {
          fileName: '',
          filePath: '/global/'
        }
        this.modalCreate = !this.modalCreate
        this.$snotify.success(`File ${res.data.data} created`)
        this.getList()
      })
    },
    removeComponent (item) {
      axios.post('/api/component/remove', {
        filePath: item.path
      }).then(res => {
        this.$snotify.success(`File ${res.data.data} removed`)
        this.getList()
      })
    },
    publishComponent () {
      this.$snotify.info('Publishing all components')
      axios.post('/api/component/publish', this.$store.state.settings).then(res => {
        this.$snotify.success('Publish all components success')
      })
    },
    getList () {
      axios.get('/api/component').then(res => {
        const files = {}

        this.components = res.data

        res.data.map((item, index) => {
          files[item.name.toLowerCase()] = item
        })

        this.$store.commit('SET_FILES', {
          data: files
        })
      })
    }
  }
}
</script>

<style lang="scss">
.card {
  cursor: pointer;
}
</style>
