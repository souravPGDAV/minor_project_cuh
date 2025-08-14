import home from './home.js';
import store from './store.js';

const routes=[
    {path:"/",name:'home',component:home}
]

const router=new VueRouter({
    routes,
    mode: 'history',
    base: '/'
})

const app=new Vue({
    el : '#app',
    delimiters:['${','}'],
    router,
    store,
    data:{

    },
    methods:{

    }
})