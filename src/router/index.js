import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Navbar from "../components/Navbar";
import Radnici from "../components/Radnici";
import Gradilista from "../components/Gradilista";
import SpisakRadnika from "../views/Tabele/SpisakRadnika";
import SpisakGradilista from "../views/Tabele/SpisakGradilista";
import Radnik from "../views/Tabele/Radnik";

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
    path: "/",
    name: "Gradilista",
    component: Gradilista,
  },
  {
    path: "/Tabele/:id",
    name: "Radnik",
    component: Radnik,
    props: true,
  },
  {
    path: "/Tabele",
    name: "SpisakRadnika",
    component: SpisakRadnika,
  },
  {
    path: "/Tabele",
    name: "SpisakGradilista",
    component: SpisakGradilista,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
