<template>
  <div class="container">
      <h3>
        <strong>Routes</strong>
      </h3>
    <h3 class="p-3 text-center">Total Routes</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Arrival Time</th>
                    <th>Depart Time</th>
                    <th>From Location</th>
                    <th>To Location</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="route in routes" :key="route.routeId">
                    <td>{{route.arrivalTime}}</td>
                    <td>{{route.departTime}}</td>
                    <td>{{route.fromLocation}}</td>
                    <td>{{route.toLocation}}</td>
                </tr>
            </tbody>
        </table>
  </div>
    <div class="col-md-12">
    <div class="card card-container">
      
      <Form @submit="handleAddRoutes" :validation-schema="schema">
          <div class="form-group">
            <label for="arrivalTime">Arrival Time</label>
            <Field name="arrivalTime" type="time" class="form-control" />
            <ErrorMessage name="arrivalTime" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="departTime">Depart Time</label>
            <Field name="departTime" type="time" class="form-control" />
            <ErrorMessage name="departTime" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="fromLocation">From Location</label>
            <Field name="fromLocation" type="text" class="form-control" />
            <ErrorMessage name="fromLocation" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="toLocation">To Location</label>
            <Field name="toLocation" type="text" class="form-control" />
            <ErrorMessage name="toLocation" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block">
              
              Add Route
            </button>
          </div>
      </Form>


    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import RouteService from '../services/route-service';
export default {
    name: "AddRoutes",
    components: {
    Form,
    Field,
    ErrorMessage,
  },
    data() {
    const schema = yup.object().shape({
      arrivalTime: yup
        .string()
        .required("Arrival Time is required!"),
       departTime: yup
        .string()
        .required("departTime is required!"),
      fromLocation: yup
        .string()
        .required("from Location is required!"),
      toLocation: yup
        .string()
        .required("To Location is required!"),
    });
    const routes = [];
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      routes
    };
    },
      computed: {
    currentUser() {
      var data = this.$store.state.auth.user;
      console.log(data.userName)
      return this.$store.state.auth.user;
    }
  },
  created() {
    console.log('Fetching all Routes in system')
      if (!this.currentUser) {
      this.$router.push('/login');
    } else {
        RouteService.getRoute().then(
            (response) => {
                this.routes = response.data.routesList;
            },
            (error) => {
                this.routes =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            }
            );
    }
    
  },
    methods: {
    handleAddRoutes(route) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log("adding rooute " + JSON.stringify(route));
      this.successful = true;
      RouteService.addRoute(route).then(
        (res) => {
            if (res) {
                RouteService.getRoute().then(
                        (response) => {
                            this.routes = response.data.routesList;
                        },
                        (error) => {
                            this.routes =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        }
                        );
            }
            
        }, 
        (error) => {
          this.routes =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
        }
      );
      RouteService.getRoute();
    //   this.$store.dispatch("auth/register", user).then(
    //     (data) => {
    //       this.message = data.message;
    //       this.successful = true;
    //       this.loading = false;
    //     },
    //     (error) => {
    //       this.message =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString();
    //       this.successful = false;
    //       this.loading = false;
    //     }
    //   );
    },
  },
}
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
