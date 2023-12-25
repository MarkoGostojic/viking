import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Navbar from "../components/Navbar";
import Radnici from "../components/Radnici";
import SpisakRadnika from "../views/Tabele/SpisakRadnika";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/",
    name: "navbar",
    component: Navbar,
  },
  {
    path: "/",
    name: "Radnici",
    component: Radnici,
  },
  {
    path: "/Tabele",
    name: "SpisakRadnika",
    component: SpisakRadnika,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
