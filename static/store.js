const store = new Vuex.Store({
    state:{
        base_url:""
    },
    mutations:{
        set_base_url(state,e){
            state.base_url=e;
        }
    },
    getters:{
        get_base_url(state){
            return state.base_url;
        }
    },
    
})

export default store;