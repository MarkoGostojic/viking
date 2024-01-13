import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Navbar from "../components/Navbar";
import Radnici from "../components/Radnici";
import Gradilista from "../components/Gradilista";

import SpisakRadnika from "../views/Tabele/SpisakRadnika";
import SpisakGradilista from "../views/Tabele/SpisakGradilista";
import Radnik from "../views/Tabele/Radnik";
import Signup from "../views/auth/Signup";
import Login from "../views/auth/Login";
import { auth } from "../firebase/config";
const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: requireAuth,
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
  {
    path: "/auth",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/auth",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
