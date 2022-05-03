//import axios from 'axios';
import http from './http-common';
import authHeader from './auth-header';
const API_URL = '/admin/';
const USER_API_URL = '/user/';

class FlightService {
  getAllFlights() {
    return http.get(API_URL + 'getAllFlights', { headers: authHeader() });
  }

  getAllSeats() {
    return http.get(API_URL + 'getAllSeats', { headers: authHeader() });
  }

  addSeat(seat) {
    
    return http.post(API_URL + 'addSeats', {
        seatNo: seat.seatNo,
        status: seat.status,
      },
      { headers: authHeader() })
  }

  getAllFares() {
    return http.get(API_URL + 'getAllFares', { headers: authHeader() });
  }

  addFare(fare) {
    
    return http.post(API_URL + 'addFares', {
        price: fare.price,
        seatType: fare.seatType,
      },
      { headers: authHeader() })
  }

  searchFlight(search) {
    
    return http.post(USER_API_URL + 'getFlights', {
      fromLocation: search.fromLocation,
        toLocation: search.toLocation,
        travelDate: new Date(search.travelDate)
      },
      { headers: authHeader() })
  }
//   combineDateAndTime(date, time) {
//     const timeString = time + ":00";
//     const year = date.getFullYear();
//     const month = ("0" + (date.getMonth() + 1)).slice(-2);
//     const day = ("0" + date.getDate()).slice(-2);
//     const dateString = "" + year + "-" + month + "-" + day;
//     const datec = dateString + "T" + timeString;
//     return new Date(datec);
// }
}

export default new FlightService();
