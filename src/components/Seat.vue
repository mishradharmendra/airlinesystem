<template>
  <div class="container">
      <h3>
        <strong>Seats</strong>
      </h3>
    <h3 class="p-3 text-center">Total Seats</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Seat Number</th>
                    <th>Status</th>
                    <!-- <th>From Location</th>
                    <th>To Location</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="seat in seats" :key="seat.seatId">
                    <td>{{seat.seatNo}}</td>
                    <td>{{seat.status}}</td>
                    <!-- <td>{{route.fromLocation}}</td>
                    <td>{{route.toLocation}}</td> -->
                </tr>
            </tbody>
        </table>
  </div>
    <div class="col-md-12">
    <div class="card card-container">
      
      <Form @submit="handleAddSeat" :validation-schema="schema">
          <div class="form-group">
            <label for="seatNo">Seat Number</label>
            <Field name="seatNo" type="text" class="form-control" />
            <ErrorMessage name="seatNo" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <Field name="status" type="text" aria-placeholder="open/occupied" class="form-control" />
            <ErrorMessage name="status" class="error-feedback" />
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
    name: "Seats",
    components: {
    Form,
    Field,
    ErrorMessage,
  },
    data() {
    const schema = yup.object().shape({
      seatNo: yup
        .string()
        .required("Seat No is required!"),
       status: yup
        .string()
        .required("Status is required!")
    });
    const seats = [];
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      seats
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
        FlightService.getAllSeats().then(
            (response) => {
                this.seats = response.data.seatsList
            },
            (error) => {
                this.seats =
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
    handleAddSeat(seat) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log("adding Seat " + JSON.stringify(seat));
      this.successful = true;
      FlightService.addSeat(seat).then(
        (res) => {
            if (res) {
                FlightService.getAllSeats().then(
                        (response) => {
                            this.seats = response.data.seatsList;
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
          this.seats =
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
