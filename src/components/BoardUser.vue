<template>
  <div class="container">
      <h3>Frequent Root Flight</h3>
      <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Flight Number</th>
                    <th>Arrival Date</th>
                    <th>Depart Date</th>
                    <th>Route</th>
                    <th>Price Starting</th>
                    <th>Select</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="flight in flights" :key="flight.flightId">
                    <td>{{flight.flightNo}}</td>
                    <td>{{flight.route.arrivalTime}}</td>
                    <td>{{flight.route.departTime}}</td>
                    <td>{{flight.route.fromLocation}} - {{flight.route.toLocation}}</td>
                    <td>{{flight.fares[0].price}}</td>
                    <td><button>Book Now</button></td>
                </tr>
            </tbody>
        </table>

        <hr />
        <h3>Search Flights </h3>
        <form @submit.prevent="handleSearch" :validation-schema="schema">
          <div class="form-group">
            <label for="fromLocation">From</label>
            <input name="fromLocation" type="text" class="form-control"  v-model="search.fromLocation"/>
            <ErrorMessage name="fromLocation" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="toLocation">To</label>
            <input name="toLocation" type="text" class="form-control" v-model="search.toLocation"/>
            <ErrorMessage name="fromLocation" class="error-feedback" />
          </div>

        <div class="form-group">
            <label for="travelDate">Travel Date</label>
            <input name="travelDate" type="date" class="form-control" v-model="search.travelDate"/>
            <ErrorMessage name="travelDate" class="error-feedback" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block"> 
              Search Flight
            </button>
          </div>
        </Form>

        <div v-if="searchResult" > 
          <h3>SearchResult</h3>
          <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Flight Number</th>
                    <th>Arrival Date</th>
                    <th>Depart Date</th>
                    <th>Route</th>
                    <th>Price Starting</th>
                    <th>Select</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="flight in searchResult" :key="flight.flightId">
                    <td>{{flight.flightNo}}</td>
                    <td>{{flight.route.arrivalTime}}</td>
                    <td>{{flight.route.departTime}}</td>
                    <td>{{flight.route.fromLocation}} - {{flight.route.toLocation}}</td>
                    <td>{{flight.fares[0].price}}</td>
                    <td><button>Book Now</button></td>
                </tr>
            </tbody>
        </table>
        </div>
  </div>
  
</template>

<script>
import flightService from '@/services/flight-service';
import { ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "User",
  components: {
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      fromLocation: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      toLocation: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      travelDate: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });
    return {
      flights: "",
      searchResult: [],
      schema,
      search:{
        fromLocation:'',
        toLocation:'',
        travelDate:''
      }
    };
  },
  created() {
    this.successful = false;
    flightService.getAllFlights().then(
      (response) => {
        this.flights = response.data.flightlist;
      },
      (error) => {
        this.flights =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    handleSearch() {
      console.log("Searching for flight " + JSON.stringify(this.search));
      flightService.searchFlight(this.search).then(
        (response) => {
          console.log(response.data);
          this.searchResult = response.data.flightList;
        },
        (error) => {
        this.searchResult =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
      );
    }
  }
};
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
