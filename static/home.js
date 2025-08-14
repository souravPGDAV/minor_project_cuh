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
                <ul style="font-size:x-large;">
                    <li style="color: grey;">Gate 1</li><div style="font-size:small;color: green;" id="bus_here">BUS is here!</div>
                    <li style="color: grey;">VC House</li>
                    <li style="color: grey;">Wi-Fi Chowk</li>
                    <li style="color: grey;">New Girls Hostel</li>
                    <li style="color: grey;">Amul</li>
                    <li style="color: grey;">Gate 2</li>
                </ul>
            </div>
        </div>
    `,
    data:function(){
        return {
           location:"null",
           latitude:null,
           longitude:null,
           locations_fetched:0,
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
        //try getting location
        this.locations_fetched=setInterval(()=>{
            this.compute_location();
        },1000);
        var b_u=window.location.origin
        this.$store.commit('set_base_url',b_u);
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
        error_in_location:function(){
            console.log("Could not fetch the location.");
        },
        get_all_locations:function(position=null){
            var request_body={'timestamp':"",'longitude':"",latitude:""}
            fetch(this.$store.getters.get_base_url+"/api/locations",{
                headers:{'Content-Type':'application/json'},method:"POST",body:JSON.stringify(request_body)
            }).then(response=>{
                console.log(response);
            })
        },
        compute_location:function(){   
            this.get_all_locations();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.set_location, this.error_in_location);
            } else {
                // !---set error here
                // "Geolocation is not supported by this browser.";
                this.location=null;
               
            }

        }
    },
    
}

export default home;