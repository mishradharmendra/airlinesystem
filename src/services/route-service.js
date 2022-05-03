//import axios from 'axios';
import http from './http-common';
import authHeader from './auth-header';
const API_URL = '/admin/';

class RouteService {
  getRoute() {
    return http.get(API_URL + 'getAllRoutes', { headers: authHeader() });
  }

  addRoute(route) {
    const d = new Date();
    //let text = d.toDateString();
    let date = this.combineDateAndTime(d, route.arrivalTime);
    console.log(date);
    return http.post(API_URL + 'addRoutes', {
        arrivalTime: this.combineDateAndTime(d, route.arrivalTime),
        departTime: this.combineDateAndTime(d, route.departTime),
        fromLocation: route.fromLocation,
        toLocation: route.toLocation,
      },
      { headers: authHeader() })
  }

  combineDateAndTime(date, time) {
    const timeString = time + ":00";
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateString = "" + year + "-" + month + "-" + day;
    const datec = dateString + "T" + timeString;
    return new Date(datec);
}
}

export default new RouteService();
