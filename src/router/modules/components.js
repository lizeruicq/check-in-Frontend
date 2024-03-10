import Layout from "@/pages/layouts/index.vue"
export default[
    
    // {
    //     path: "/weekly",
    //     component: Layout,
    //     redirect: "/weekly/index",
    //     name: "weekly",
    //     meta: { title: "周报管理", icon: '&#xe60f;' },
    //     children: [
    //       {
    //         path: "index",
    //         name: "weekly",
    //         meta: { title: "周报管理" },
    //         component: () => import("@/pages/weekly/index.vue"),
    //       },
    //       {
    //         path: "statistic",
    //         name: "statistic",
    //         meta: { title: "数据统计" },
    //       },
    //     ],
    //   },


      {
        path: "/daily",
        component: Layout,
        redirect: "/daily/dailylist",
        name: "daily",
        meta: { title: "每日考勤", icon: '&#xe610;' },
        children: [
          {
            path: "dailylist",
            name: "dailylist",
            meta: { title: "每日考勤" },
            component: () => import("@/pages/daily/dailylist/index.vue"),
          },
          {
            path: "dailydetail",
            name: "dailydetail",
            meta: { title: "考勤详情" },
            component: () => import("@/pages/daily/dailydetail/index.vue"),
          },
        ],
      },

      {
        path: "/users",
        component: Layout,
        redirect: "/users/index",
        name: "users",
        meta: { title: "用户管理", icon: '&#xe60f;' },
        children: [
          {
            path: "index",
            name: "users",
            meta: { title: "人员管理" },
            component: () => import("@/pages/users/index.vue"),
          },
        ],
      },

      

]