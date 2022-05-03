<template>
  <div class="container">
      <h3>
        <strong>Fares</strong>
      </h3>
    <h3 class="p-3 text-center">Total Fares</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Price</th>
                    <th>Seat Type</th>
                    <!-- <th>From Location</th>
                    <th>To Location</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="fare in fares" :key="fare.fareId">
                    <td>{{fare.price}}</td>
                    <td>{{fare.seatType}}</td>
                    <!-- <td>{{route.fromLocation}}</td>
                    <td>{{route.toLocation}}</td> -->
                </tr>
            </tbody>
        </table>
  </div>
    <div class="col-md-12">
    <div class="card card-container">
      
      <Form @submit="handleAddFare" :validation-schema="schema">
          <div class="form-group">
            <label for="price">Price</label>
            <Field name="price" type="number" class="form-control" />
            <ErrorMessage name="price" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="seatType">Seat Type</label>
            <Field name="seatType" type="text" placeholder="general/business" class="form-control" />
            <ErrorMessage name="seatType" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="seat">Seat</label>
            <select  multiple data-live-search="true" class="form-control" >
              <option>Mustard</option>
              <option>Ketchup</option>
              <option>Relish</option>
            </select>
          </div>
          <!-- <div class="form-group">
            <label for="fromLocation">From Location</label>
            <Field name="fromLocation" type="text" class="form-control" />
            <ErrorMessage name="fromLocation" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="toLocation">To Location</label>
            <Field name="toLocation" type="text" class="form-control" />
            <ErrorMessage name="toLocation" class="error-feedback" />
          </div> -->

          <div class="form-group">
            <button class="btn btn-primary btn-block">
              
              Add Seat
            </button>
          </div>
      </Form>


    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import FlightService from '../services/flight-service';
export default {
    name: "Fares",
    components: {
    Form,
    Field,
    ErrorMessage,
  },
    data() {
    const schema = yup.object().shape({
      price: yup
        .number()
        .required("Price is required!"),
       seatType: yup
        .string()
        .required("Seat Type is required!")
    });
    const fares = [];
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      fares
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
        FlightService.getAllFares().then(
            (response) => {
                this.fares = response.data.farelist
            },
            (error) => {
                this.fares =
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
    handleAddFare(fare) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log("adding Fare " + JSON.stringify(fare));
      this.successful = true;
      FlightService.addFare(fare).then(
        (res) => {
            if (res) {
                FlightService.getAllFares().then(
                        (response) => {
                            this.fares = response.data.farelist;
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
          this.fares =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
        }
      );
      FlightService.getAllSeats();
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
