import React from "react";
import TwoHands from "../images/twohandsdonation.svg";
import Crown from "../images/crown.svg";


import { VictoryPie, VictoryTooltip, VictoryAxis, VictoryLegend } from "victory";

const fakeData = [
  { x: "Bi-monthly Charity Dinner", y: 130, fill: "#FFA001" },
  { x: "Online (Benevity)", y: 124, fill: "#FE5366" },
  { x: "Online (REACH)", y: 55, fill: "#FF9A85" },
  { x: "Church Donations", y: 20, fill: "#80485B" },
  { x: "Others", y: 20, fill: "#CB87B0" }
];

/* highest value of y in fakeDATA */
/* const highestDonorIntent = Math.max.apply(Math, fakeData.map(function(o){return o.y;})) */


const ByIntent = () => (
  <div className="chart">
    <div className="chart-holder">

      <VictoryPie
        innerRadius={120}
        /* labelComponent={<VictoryTooltip activateData={true} flyoutStyle= {{display: "none"}} />} */
        labelComponent={<VictoryAxis tickFormat={() => ''} />}
        padAngle={8}
        data={fakeData}
        style={{
          data: {
            fill: ({ datum }) => datum.fill
          }
        }
        }
      >

      </VictoryPie>

    </div>
    <div>
      <div className= "flex"><img src = {Crown}/><h1 className= "byintent-crownvalue">{fakeData[0].y}</h1></div>
      <div className = "flex">
        <div className="legend brightorange"></div>
        <div className = "byintent-name"> {fakeData[0].x}</div>
      </div>    
    </div>

    <div>
        <h1 className= "byintent-value">{fakeData[1].y}</h1>
        <div className = "flex">
          <div className="legend pink"></div> 
          <div className = "byintent-name">{fakeData[1].x}</div>
        </div>
    </div>

    <div>
        <h1 className= "byintent-value">{fakeData[2].y}</h1>
        <div className = "flex">
          <div className="legend lightpink"></div> 
          <div className ="byintent-name">{fakeData[2].x}</div>
        </div>
    </div>

    <div>
        <h1 className= "byintent-value">{fakeData[3].y}</h1>
        <div className = "flex">
          <div className="legend darkpurple"></div> 
          <div className= "byintent-name">{fakeData[3].x}</div>
        </div>  
    </div>

    <div>
        <h1 className= "byintent-value">{fakeData[4].y}</h1>
        <div className = "flex">
          <div className="legend lilac"></div> 
          <div className = "byintent-name">{fakeData[4].x}</div>
        </div>
    </div>
        
    <img src={TwoHands} className="twohands" />
  </div>



);

export default ByIntent;
