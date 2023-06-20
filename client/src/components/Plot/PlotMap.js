import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

export default function PlotMap(props) {

// Calculating center point of four coordinates
const calcCenterTriangle=(arr)=>{
const tr1=(arr[0]+arr[1]+arr[2])/3;
const tr2=(arr[1]+arr[2]+arr[3])/3;
return (tr1+tr2)/2
}

const calcCenter=(cords)=>{
    const lats= cords.map((el)=> el.lat);
    const lngs= cords.map((el)=> el.lng);
    const lat=calcCenterTriangle(lats);
    const lng=calcCenterTriangle(lngs);
   return {lat,lng}
}


const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const {cords}=props;
  // const centerPoint=cords[0];
  const centerPoint=calcCenter(cords);


 let defaultProps = {
   zoom: 18,
  // center: {
  //   lat:  31.515894, lng: 74.340111
  // },
  center: centerPoint,
  mapTypeId: "terrain"
};

  const handleApiLoaded = (map, maps) => {
    // const radiumCoords = [
    //   { lat:  31.515894, lng: 74.340111 },
    //   { lat:  31.515936, lng: 74.340052},
    //   { lat:31.515994, lng: 74.340131 },
    //   { lat:  31.515945, lng:  74.340183}
    // ];
  
     var bermudaTriangle = new maps.Polygon({
      paths: cords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
  };


  return (
    <div className='mapBox'>
    <GoogleMapReact
      // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    >
      {/* <AnyReactComponent
        lat={59.955413}
        lng={30.337844}
        text="My Marker"
      /> */}
    </GoogleMapReact>
  </div>
  )
}
