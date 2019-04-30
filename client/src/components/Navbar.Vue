<template>
    <div>
<b-navbar toggleable="lg" type="dark" variant="secondary" position: sticky >
    <b-navbar-brand href="#">GrowX</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       <b-navbar-nav>
        <b-nav-item href="#">DataControl</b-nav-item>
        <b-nav-item href="#" >DataDate</b-nav-item>
        <b-nav-item href="#" >Graph</b-nav-item>
      </b-navbar-nav>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content"><em>{{username}}</em></template>
           <b-dropdown-item v-if="role === 'admin'" href='/#/register'>Register</b-dropdown-item>
           <b-dropdown-item href="/" @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>




</div>
</template>

<script>
import  jwtDecode from 'jwt-decode'
export default {
    data(){
        const token = localStorage.usertoken   
       const decode = jwtDecode(token) 
        return{
              username: decode.dataLogin[0],
              role : decode.dataLogin[2]
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('usertoken')
            localStorage.removeItem('dew')

        }
    },
}
</script>