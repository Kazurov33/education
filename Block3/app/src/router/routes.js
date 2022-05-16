const routes = [
  {
    path: "/login",
    name: "WebLogin",
    component: () => import("../pages/Web/Enter/LoginPage.vue"),
  },
  {
    path: "",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/Home.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;