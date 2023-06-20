import React,{useContext,useState} from 'react';
import Api from '../../Api';
import { useEffect } from 'react';
import{ FormHeading} from '../Generic/FormHeading'
import { FormDropdown } from '../Generic/FormDropdown';
import Input from '../Generic/Input';
import PlotMap from './PlotMap';
import UsersContext from '../../context/users/UsersContext';
import './../../css/Plot.css'

export default function Plot() {
 

  const {user,getUserPlot}=useContext(UsersContext);
  const [plotInfo,setPlotInfo]=useState();

  useEffect(()=>{
   getUserPlot(user.id).then((res)=>{
    setPlotInfo(res[0])
   })
  },[])

  
  
  return (  plotInfo ?  <div className='plotDiv'>
   <FormHeading value="Plot Location" marginTop='2rem'/>
      <PlotMap {...(plotInfo)}/>
    
      <FormHeading value="Plot Details" />
      <form className='mb-5'>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <FormDropdown
                name="plotType"
                width="60%"
                backgroundColor="#bd960a"
                color="white"
                list={["Commercial", "Residential"]}
                disabled={true}
                defaultValue={plotInfo.plotType}
                noDropdown='true'
              />
            </div>

            <div className="col-6 mt-2 text-end">
              <FormDropdown
                name="block"
                width="60%"
                backgroundColor="#bd960a"
                color="white"
                list={["Commercial", "Residential"]}
                // onChange={onChange}
                disabled={true}
                defaultValue={plotInfo.block}
                noDropdown='true'
              />
            </div>

            <div className="col-6  mt-2">
              <FormDropdown
                name="plotArea"
                width="60%"
                backgroundColor="#bd960a"
                color="white"
                list={["Commercial", "Residential"]}
                // onChange={onChange}
                disabled={true}
                defaultValue={plotInfo.plotArea}
                noDropdown='true'
              />
            </div>

            <div className="col-6 text-end mt-3">
              <Input
                placeholder="Enter plot no"
                width="60%"
                name="plotNo"
                type="text"
                // onChange={onChange}
                disabled={true}
                defaultValue={plotInfo.plotNo}
                label="l"
                labelVal="Plot Number"
                noDropdown='true'
              />
            </div>

            <div className="col-6  mt-3">
              <Input
                placeholder="Enter plotPrice"
                width="60%"
                name="plotPrice"
                type="number"
                // onChange={onChange}
                disabled={true}
                defaultValue={plotInfo.plotPrice}
                label="r"
                labelVal="Plot Price"
              />
            </div>

            <div className="col-6 text-end ">
              <Input
                placeholder="Enter plot latitude"
                width="60%"
                name="lat"
                type="text"
                // onChange={onChange}
                disabled={true}
                defaultValue={plotInfo.cords[0].lat+"°"}
                label="l"
                labelVal="Latitude(Cordinates)"
              />
            </div>

            <div className="col-6  ">
              <Input
                placeholder="Enter plot longitude"
                width="60%"
                name="lng"
                type="text"
                // onChange={onChange}
                disabled={true}
                defaultValue={plotInfo.cords[0].lng+"°"}
                label="r"
                labelVal="Longitude(Cordinates)"
                
              />
            </div>

          </div>
        </div>
      </form>
   

  </div>:<div className='text-center'> <div className="spinner-grow" style={{ width: "5rem", height: '5rem', marginTop: "11rem" }} role="status">

  </div><div className="" style={{ fontSize: "12px" }}>Loading...</div></div>
  )
}
