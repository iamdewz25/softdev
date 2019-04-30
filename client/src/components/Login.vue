<template>

  <div>
    
    <title>Login</title>

    <b-img src="@/logo.png" ></b-img>


    <b-container class="bv-example-row">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-row class="justify-content-md-center">
          <b-col cols="6" md="4" class="span6" style="float: none; margin: 0 auto;">
            <b-form-group id="input-group-1" label="Username:" label-for="input-1">
              <b-form-input id="input-1" v-model="form.username" type="text" required placeholder="Enter username"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="justify-content-md-center">
          <b-col cols="6" md="4" class="span6" style="float: none; margin: 0 auto;">
            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
              <b-form-input id="input-2" type="password" v-model="form.password" required placeholder="Enter password"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-button type="submit" variant="success">Login</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import  jwtDecode from 'jwt-decode'
  export default {
    data() {
      return {
        admin:{
          username: 'admin',
          password: 'admin'
        },
        form: {
          username: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        if (this.form.username !='' && this.form.password != '')
        {
          
          //alert(JSON.stringify(this.form))
          axios.post('http://localhost:8081/users/login',{
            username: this.form.username,
            password: this.form.password
          }).then(res =>{
            if(res.data == 'No username'){
              alert('No')
            }
            localStorage.setItem('usertoken',res.data)
            const decode = jwtDecode(res.data)
            if(res.data != 'No username'){
              
            alert(" username  password correct")
            axios.post('http://localhost:8081/users/datacontrol',{
                username: this.form.username,
                role: decode.dataLogin[2]
            }).then(res =>{

              localStorage.setItem('test',JSON.stringify(res.data))

              if(decode.dataLogin[2]==='admin')
              router.push('/admin')
              else router.push('/admin')

            })

            }
            else{
                alert("Wrong username or password")
            }
            
          

            this.form.username = ''
            this.form.password = ''

          })
          eventBus.$emit('logged-in','loggedin')


          
          
        }
        
        
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.username = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }

</script>


<style>

</style>

<!-- 
<script>
  import LoginAPI from '@/services/LoginAPI.js'
  export default {
    computed: {
      nameState() {
        return this.name.length > 0 ? true : false
      },
      passwordState() {
        return this.password.length > 0 ? true : false
      }
    },
    data() {
      return {
        name: '',
        password: '',
        resdt: []
      }
    },
    mounted() {
      this.loadLogin()
    },
    methods: {
      async loadLogin() {
        const response = await LoginAPI.getLogin()
        this.resdt = response.data
      }

    }
  }

</script>
-->
