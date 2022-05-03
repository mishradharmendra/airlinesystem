<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.userName}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.auth_TOKEN.substring(0, 20)}} ... {{currentUser.auth_TOKEN.substr(currentUser.auth_TOKEN.length - 20)}}
    </p>
    <!-- <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p> -->
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <p>{{currentUser.userType}}</p>
    <!-- <ul>
      <li v-for="role in currentUser.user" :key="role">{{role}}</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      var data = this.$store.state.auth.user;
      console.log(data.userName)
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>