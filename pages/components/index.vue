<template>
  <div class="content">
    <Navbar :data="navbar" :create="create" :publish="publish"/>
    <div class="content-inner">
      <div class="row">
        <div class="col-3 col-xl-2" v-for="item in components" :key="item.key">
          <div class="card">
            <div class="card-body">
              <div class="card-image" @click="open(item)">
                <img src="~/static/vue.svg" :alt="item.name">
              </div>
              <div class="card-title" @click="open(item)">{{ item.name }}</div>
              <div class="card-remove" @click="remove(item)">
                <span class="ion-trash-b"></span>
              </div>
            </div>
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
      <b-button variant="primary" @click="save">Submit</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Navbar from '~/components/global/Navbar.vue'

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
    this.list()
  },
  methods: {
    open (file) {
      this.$router.push(`/components/editor?file=${file.name.toLowerCase()}`)
    },
    create () {
      this.modalCreate = !this.modalCreate
    },
    save () {
      axios.post('/api/component/create', this.form).then(res => {
        this.form = {
          fileName: '',
          filePath: '/global/'
        }
        this.modalCreate = !this.modalCreate
        this.$snotify.success(`File ${res.data.data} created`)
        this.list()
      })
    },
    remove (item) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#df4848',
        cancelButtonColor: '#ababab',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios.post('/api/component/remove', {
            filePath: item.path
          }).then(res => {
            axios.get('/api/component/map').then(res => {
              this.$snotify.success('Mapping new components success')
            })
            this.$swal(
              'Deleted!',
              `File ${res.data.data} removed`,
              'success'
            )
            this.list()
          })
        }
      })
    },
    publish () {
      this.$snotify.info('Publishing all components')
      axios.post('/api/component/publish', this.$store.state.settings).then(res => {
        this.$snotify.success('Publish all components success')
      })
    },
    list () {
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
