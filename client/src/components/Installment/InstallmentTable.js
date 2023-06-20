import { Space, Table, Tag } from 'antd';
import React from 'react';
import Api from '../../Api';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useState , useEffect } from 'react';





export default function InstallmentTable(props){
  const {pending,setPending}=props;
  const {requestCount} =props.installmentPlan;

    
const [installmentData, setInstallmentData] = useState(null);




const getInstallmentData = async ()=>{
   let userId=jwtDecode( Cookies.get( 'jwt' ) ).id;
    const res = await Api.get(`/installment/userid/${userId}`,
    {
        headers: {Authorization: `Bearer ${ Cookies.get( 'jwt' )}`}
    })
    console.log(res.data.data)
    setInstallmentData(res.data.data)
}

useEffect(() => {
  getInstallmentData();
}, []);


if(!pending && installmentData)
setPending(requestCount+1>installmentData && installmentData[0].installmentCount? true:false);


const columns = [
  {
    title: 'No.',
    dataIndex: 'index',
    key: 'index',
    width:'5%'
  },
  {
    title: 'Booking',
    dataIndex: 'booking',
    key: 'booking',
    width:'15%',
    align:'center'


  },
  {
    title: 'Installment',
    dataIndex: 'installment',
    key: 'installment',
    width:'15%',
    align:'center'


  },
  {
    title: 'Half Year',
    dataIndex: 'halfyear',
    key: 'halfyear',
    width:'15%',
    align:'center'


  },
  {
    title: 'Fine',
    dataIndex: 'fine',
    key: 'fine',
    width:'15%',
    align:'center'


  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    width:'20%',
    align:'center'


  },
  {
    title: 'Status',
    key: 'status',
    render: (val) => { 
      console.log(val)

      if(val.index<installmentData[0].installmentCount+1){
        return(
          <button className="btn btn-sm btn-secondary show_table_btn show_table_btn_paid" disabled='true'>Paid</button>
      )
      }
      if ( val.index===installmentData[0].installmentCount+1 ){
        if(!pending) {
         return <button  className="btn btn-sm btn-success show_table_btn" data-bs-toggle="modal" data-bs-target="#exampleModal">{"Pay & Approve"}</button>

        }else{
         return <button disabled='true' type="button" className="btn btn-sm btn-secondary show_table_btn">Pending</button>

        }

       return  <button className='btn btn-sm btn-dark'>Pending</button>
      }
      if(val.index>installmentData[0].installmentCount+1){
      return  <button disabled='true' className="btn btn-sm btn-danger show_table_btn">Pay</button>
      }

     },
    width:'15%',
    align:'center'

  },
];

let data = []


if (installmentData!=null) {
  console.log(installmentData[0])
  
  for (let i = 0; i < installmentData[0].totalInstallmentCount; i++) {
    console.log('-------------------')
    let total=0;
    total+=installmentData[0].installmentPerMonth+ installmentData[0].fine;
    if((i+1)===1) total+=installmentData[0].bookingAmount;
    if((i+1)%6===0) total+=installmentData[0].halfYearPayment;
    
    
    
    data.push({
    index: i+1,
    booking: i===0 ? installmentData[0].bookingAmount :'_',
    installment: installmentData[0].installmentPerMonth,
    halfyear:  (i+1)%6===0 ? installmentData[0].halfYearPayment : '_',
    fine: installmentData[0].fine,
    total,
  })
}

}

console.log(data)





    return(<Table scroll={{ x: 400 }} columns={columns} dataSource={data} pagination= { {pageSizeOptions: ['12'], showSizeChanger: false}} />)




}


