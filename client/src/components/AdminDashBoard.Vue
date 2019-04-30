<template>
    <div>
        <Navbar> </Navbar>
        <h1>Admin DashBoard</h1>
        <h2>{{token}}</h2>
        <h3>{{username}}</h3>
        <h4>{{password}}</h4>
        <h5>{{role}}</h5>
        <h6>Username:: {{y[0].USERNAME}}</h6>

        
    </div>
</template>

<script>
import  jwtDecode from 'jwt-decode'
import Navbar from './Navbar'
export default {
    data(){
        const token = localStorage.usertoken
    
        const decode = jwtDecode(token)    
        const x = localStorage.test
        var user = JSON.parse(localStorage.getItem('test'));
    
        return{
            username : decode.dataLogin[0],
            password : decode.dataLogin[1],
            role : decode.dataLogin[2],
            y: user
        }
    },
    mounted() {
      
    },
    components: {
    'Navbar': Navbar
  }

}
</script>