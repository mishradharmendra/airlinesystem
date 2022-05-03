<template>
  <div class="container">
    <header >
      <h3>admin board</h3>
    </header>
    <p>
      <router-link to="/addFlightRoutes" class="nav-link">Add Route</router-link>
    </p>
     <p>
      <router-link to="/flights" class="nav-link">Add Flight</router-link>
    </p>
    <p>
      <router-link to="/seats" class="nav-link">Add Seat</router-link>
    </p>
    <p>
      <router-link to="/fares" class="nav-link">Add Fare</router-link>
    </p>
  </div>
</template>

<script>
//import UserService from "../services/user.service";

export default {
  name: "Admin",
  data() {
    return {
      content: "",
    };
  },
  // mounted() {
  //   UserService.getAdminBoard().then(
  //     (response) => {
  //       this.content = response.data;
  //     },
  //     (error) => {
  //       this.content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //     }
  //   );
  // },
};
</script>
