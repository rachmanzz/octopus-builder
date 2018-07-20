<template>
  <div class="content">
    <Navbar :data="navbar" :onRefresh="refresh"/>
    <div class="content-inner">
      <div class="row">
        <div class="col-6">
          <b-card
            header="featured"
            header-tag="header"
          >
            <b-form-group id="exampleInputGroup2"
              label="Your Name:"
              label-for="exampleInput2"
              description="We'll never share your email with anyone else.">
              <b-form-input id="exampleInput2"
                type="text"
                v-model="form.name"
                required
                placeholder="Enter name">
              </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup3"
              label="Food:"
              label-for="exampleInput3">
              <b-form-select id="exampleInput3"
                :options="foods"
                required
                v-model="form.food">
              </b-form-select>
            </b-form-group>
            <b-form-group id="exampleGroup4">
              <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                <b-form-checkbox value="me">Check me out</b-form-checkbox>
                <b-form-checkbox value="that">Check that out</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-card>
        </div>
        <div class="col-6">
          <b-card
            header="featured"
            header-tag="header"
          >
            <div v-if="isLoading">Please Wait ...</div>
            <div class="row">
              <div class="col-4" v-for="item in server" :key="item.key" @click="openEditor(item)">
                <div class="card">
                  <div class="card-body">
                    {{ item.host }}:{{ item.port }}

                    <div>{{ item.status.active }}</div>
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </div>
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
        title: 'Settings',
        refresh: true,
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
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      config: [],
      server: [],
      isLoading: true
    }
  },
  mounted () {
    axios.get('/api/server').then(res => {
      this.config = res.data
      this.serverSatus(res.data)
    })
  },
  methods: {
    refresh (e) {
      console.log(e)
      // this.serverSatus(this.config)
    },
    serverSatus (server) {
      this.isLoading = true

      axios.post('/api/server/status', {
        server: server.clients
      }).then(res => {
        const stat = {}

        res.data.map((item, index) => {
          server.clients[index]['status'] = item
          stat[index] = server.clients[index]
        })

        this.server = stat
        this.isLoading = false
      })
    }
  }
}
</script>