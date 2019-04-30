<template>
  <div>
    <title>Register</title>
    <b-container class="bv-example-row" style="width:20vw">
      <b-card bg-variant="light">
        <b-form @submit="onSubmit" @reset="onBack" v-if="show">

          <b-row class="justify-content-md-center">
            <b-col style="float: none; margin: 0 auto;">
              <b-form-group id="input-group-1" label-cols-lg="5" label="Username :" label-for="input-1">

                <b-form-input id="input-1" v-model="form.username" type="text" required>
                </b-form-input>

              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="justify-content-md-center">
            <b-col style="float: none; margin: 0 auto;">
              <b-form-group id="input-group-2" label-cols-lg="5" label="Password:" label-for="input-2">

                <b-form-input id="input-2" type="password" :state="validationPassword" v-model="form.password" required>
                </b-form-input>



              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="justify-content-md-center">
            <b-col style="float: none; margin: 0 auto;">
              <b-form-group id="input-group-2" label-cols-lg="5" label="Confirm Password:" label-for="input-2">

                <b-form-input id="input-2" type="password" :state="validationPassword" v-model="form.password2"
                  required></b-form-input>

                <b-form-invalid-feedback :state="validation"> Password does not match
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="justify-content-md-center">
            <b-col style="float: none; margin: 0 auto;">
              <b-form-select v-model="form.role" :state="validationRole" :options="options" class="mb-3">
                <template slot="first">
                  <option :value="null" disabled>-- Please select a role --</option>
                </template>
              </b-form-select>
            </b-col>
          </b-row>

          <b-button type="submit" variant="success">Register</b-button>
          <b-button type="reset" variant="secondary">Back</b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
  import router from '../router'
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
          password2: '',
          role: null
        },
        options: [{
            value: 'admin',
            text: 'ADMIN'
          },
          {
            value: 'user',
            text: 'USER'
          }
        ],
        show: true,
        roleState: null
      }
    },

    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        if (this.form.password !== this.form.password2) {
          alert("Password must be the same")
        } else if (this.form.role === null) {
          this.roleState = false
          alert("Please choose a role")
        } 

        else {
            axios.post('http://localhost:8081/users/register', {
            username: this.form.username,
            password: this.form.password,
            role: this.form.role
          }).then(res => {
            alert(res.data)
            this.form.username = ''
            this.form.password = ''
            this.form.password2 =''
            this.form.role = null
          }).catch(err => {
            console.log(err)
          })
        }


      },
      onBack(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.username = ''
        this.form.password = ''
        this.form.password2 = ''
        this.form.role = null
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
        //back to admin dashboard
        router.push({
          path: '/'
        })
      }
    },
    computed: {
      validationPassword() {
        if (this.form.password !== '' && this.form.password2 !== '') {
          return this.form.password === this.form.password2 ? true : false
        }
      },
      validationRole() {
        if (this.form.role !== null) {
          this.roleState = null
          return true
        }
        if (this.roleState == false) {
          return false
        } else return null
      }
    },


  }

</script>
