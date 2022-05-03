import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import FlightRoutes from "./components/FlightRoutes.vue";
import Flight from "./components/Flight.vue";
import Seat from "./components/Seat.vue";
import Fare from "./components/Fare.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardUser = () => import("./components/BoardUser.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/AddFlightRoutes",
    name: "addFlightRoutes",
    // lazy-loaded
    component: FlightRoutes,
  },
  {
    path: "/flights",
    name: "flights",
    // lazy-loaded
    component: Flight,
  },
  {
    path: "/seats",
    name: "seats",
    // lazy-loaded
    component: Seat,
  },
  {
    path: "/fares",
    name: "fares",
    // lazy-loaded
    component: Fare,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;