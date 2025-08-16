const home ={
    template :
    `
        <div>
            <div id="date_time">
            <div id="date">Date: {{date}}</div>
            <div id="location">Your Location: {{location}}</div>
            </div>
            <div id="bus_locations">
                <h5>Bus locations</h5>
                <table>
                    <tr>
                        <td>Gate 1 </td>
                        <td>{{at_gate1}}</td>
                        <td>{{bus_at_gate1}}</td>
                    </tr>
                    <tr>   
                        <td>VC House</td>
                        <td>{{at_vch}}</td>
                        <td>{{bus_at_vch}}</td>
                    </tr>
                    <tr>
                        <td>Wi-Fi Chowk</td>
                        <td>{{at_chowk}}</td>
                        <td>{{bus_at_chowk}}</td>
                    </tr>
                    <tr>
                        <td>New Girls Hostel</td>
                        <td>{{at_ngh}}</td>
                        <td>{{bus_at_ngh}}</td>
                    </tr>
                    <tr>
                        <td>Amul</td>
                        <td>{{at_amul}}</td>
                        <td>{{bus_at_amul}}</td>
                    </tr>
                    <tr>
                        <td>Gate 2</td>
                        <td>{{at_gate2}}</td>
                        <td>{{bus_at_gate2}}</td>
                    </tr>
                </table>
            </div>
        </div>
    `,
    data:function(){
        return {
           location:"null",
           latitude:null,
           longitude:null,
           locations_fetched:0,
           at_gate1:0,
           bus_at_gate1:false,
           at_vch:0,
           bus_at_vch:false,
           at_chowk:0,
           bus_at_chowk:false,
           at_ngh:0,
           bus_at_ngh:false,
           at_amul:0,
           bus_at_amul:false,
           at_gate2:0,
           bus_at_gate2:false
        }
    },
    computed:{
        date:function(){
            return new Date();
        }
    },
    watch:{
        location:function(oldlocation, newLocation){
            
        }
    },
    async mounted(){
        var b_u=window.location.origin
        this.$store.commit('set_base_url',b_u);

        var response=await this.fetch_user_id();
        if(response){
            console.log('',response);
            
            
            // try getting location
            this.locations_fetched=setInterval(()=>{
                this.compute_location();
            },5000);    
        }

        
    },
    methods:{
        set_location:function(position){        
            if(position.coords.latitude<28.345 || position.coords.longitude>76.160 || 
                position.coords.latitude>28.370 || position.coords.longitude<76.120){
                    alert("Sorry, you are not around the university!");
            }
            else{
                
                this.latitude=position.coords.latitude;
                this.longitude=position.coords.longitude;
                this.location=this.latitude+","+" "+this.longitude; 
            }
        },
        fetch_user_id:function(){
            if('user_id' in localStorage){
                this.$store.commit('set_user_id',localStorage['user_id']);
            }
            else{
                fetch(this.$store.getters.get_base_url+"/api/user",{
                    headers:{'Content-Type':'application/json',method:"GET"}
                }).then(response=>{
                    if(!response.ok){
                        console.log("error fetching user_id");//throw an error
                        return false;
                    }
                    else{
                        return response.json();
                    }
                }).then(resp=>{
                    localStorage.setItem("user_id",resp.user_id);
                    this.$store.commit('set_user_id',localStorage['user_id']);
                })
            }
            return true;
        },
        error_in_location:function(){
            console.log("Could not fetch the location.");
        },
        get_all_locations:function(position=null){
            var request_body={'user_id':this.$store.getters.get_user_id,'timestamp':Date.now(),'longitude':this.longitude,'latitude':this.latitude}
            console.log('sending',request_body);
            fetch(this.$store.getters.get_base_url+"/api/locations",{
                headers:{'Content-Type':'application/json'},method:"POST",body:JSON.stringify(request_body)
            }).then(response=>{
                return response.json();
            }).then(data=>{
                console.log(data);
                for (var location in data){
                    var [l1,l2]=[28.352921, 76.152185];
                    var [lat,long]=this.get_pins_of("g1");
                    if(this.near_the_location(lat,long,l1,l2)){
                        this.at_gate1+=1;
                    }
                    else{
                        console.log("not near gate 1");
                        var [lat,long]=this.get_pins_of("chk");
                        if(this.near_the_location(lat,long,l1,l2)){
                        this.at_vch+=1;
                        }
                        else{
                            console.log("not near wi-fi chowk");
                            var [lat,long]=this.get_pins_of("ngH");
                            if(this.near_the_location(lat,long,l1,l2)){
                                this.at_ngh+=1;
                            }
                            else{
                                console.log("not near new girls hostel");
                                var [lat,long]=this.get_pins_of("g2");
                                if(this.near_the_location(lat,long,l1,l2)){
                                    this.at_gate2+=1;
                                }
                                else{
                                    console.log("not near gate 2");
                                }
                            }
                        }
                    }
                }
                
            })
        },
        near_the_location: function(lat0,long0,lat,long){
    
            const kLat = 111132.0;
            const kLon = 111320.0 * Math.cos(lat0 * Math.PI / 180);
            const dy = (lat - lat0) * kLat;
            const dx = (long - long0) * kLon;
            return (dx*dx + dy*dy) <= 100*100;
        },
        get_pins_of: function(loc){
            switch(loc){
                case "g1": return [28.351590, 76.131367];
                case "vch": return [28.352676, 76.137418];
                case "chk": return [28.351583, 76.147268];
                case "ngH": return [28.352691, 76.152061];
                case "amul": return [28.355090, 76.148263];
                case "g2": return [28.359332, 76.147292];
                default: return [null, null];

            }
        },
        compute_location:async function(){   

            if (navigator.geolocation) {
                await navigator.geolocation.getCurrentPosition(this.set_location, this.error_in_location);
            } else {
                // !---set error here
                // "Geolocation is not supported by this browser.";
                this.location=null;
                console.log('failed to get your location');
               
            }
            if(this.latitude){
                this.get_all_locations();
            }
            
        }
    },
    
}

export default home;