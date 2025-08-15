const store = new Vuex.Store({
    state:{
        base_url:"",
        user_id:null,
    },
    mutations:{
        set_base_url(state,e){
            state.base_url=e;
        },
        set_user_id(state,val){
            state.user_id=val;
        }
    },
    getters:{
        get_base_url(state){
            return state.base_url;
        },
        get_user_id(state){
            return state.user_id;
        }
    },
    
})

export default store;