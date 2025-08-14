const home ={
    template :
    `
        <div>
            <div id="date_time">
            <div id="date">Date: {{date}}</div>
            <div id="location">Location:</div>
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
            date: "",  
        }
    }
}

export default home;