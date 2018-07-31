<template>
  <div class="content">
    <Navbar :data="navbar" />
    <div class="container content-inner">
      <div class="card card-table mb-3 pb-3">
        <div class="card-body">
          <b-btn size="sm" variant="outline-success" @click="modalCreate = !modalCreate" class="mr-2">Create New</b-btn>
          <b-btn size="sm" variant="outline-primary" @click="publish('all')" class="mr-2">Publish All</b-btn>
        </div>
      </div>
      <div class="row">
        <div class="col-4 mb-3" v-for="item in pages" :key="item.key">
          <div class="card card-link" @click="openBuilder(item)">
            <div class="card-body">
              {{ item.name }} 
              {{ item.path }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      v-model="modalCreate"
      title="New Page"
      centered hide-footer
    >
      <b-form-group
        label="Page Name"
        label-for="name">
        <b-form-input
          id="name"
          type="text"
          v-model="form.name"
          placeholder="Enter Page Name">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Page URL"
        label-for="path">
        <b-form-input
          id="path"
          type="text"
          v-model="form.path"
          placeholder="Enter Page URL">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Description"
        label-for="description">
        <b-form-textarea
          id="description"
          rows="4"
          v-model="form.description"
          placeholder="Enter Description">
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="Clients">
        <multiselect v-model="form.client" :options="clients" :multiple="true" :close-on-select="false" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true" />
      </b-form-group>
      <b-button variant="outline-primary" @click="save">Create Page</b-button>
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
        title: 'Studio'
      },
      form: {
        name: '',
        path: '/',
        description: '-',
        client: []
      },
      clients: [],
      modalCreate: false,
      pages: []
    }
  },
  mounted () {
    axios.get('/core/setting').then(res => {
      res.data['clients'].map(item => {
        this.clients.push({
          name: item.name,
          value: item
        })
      })
    })

    this.list()
  },
  methods: {
    openBuilder (page) {
      this.$store.commit('SET_PAGE', page)
      this.$router.push(`/studio/editor`)
    },
    save () {
      this.form['clients'] = this.form['client'].map(item => item.value)

      axios.post('/core/page', this.form).then(res => {
        this.modalCreate = !this.modalCreate
        this.$snotify.success('Create page success')
        this.list()
        this.form = {
          name: '',
          path: '/',
          description: '-',
          client: []
        }
      })
    },
    remove (data) {
      const item = data.item
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#df4848',
        cancelButtonColor: '#ababab',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.value) {
          axios.post('/core/component/remove', {
            filePath: item.path
          }).then(res => {
            axios.get('/core/component/source').then(res => {
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
    publish (data) {
      //   axios.post('/core/client/render', {
      //     clients: this.$store.state.settings.clients,
      //     source: mapping
      //   }).then(result => {
      //     this.$snotify.success('Generate page success')
      //   })
    },
    list () {
      axios.get('/core/page').then(res => {
        this.pages = res.data['pages']
      })
    }
  }
}
</script>
