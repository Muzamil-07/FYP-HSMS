import { Tabs } from 'antd';
import React from 'react';
import { FormHeading } from '../Generic/FormHeading';
import FormCard from './FormCard'
import './../../css/SocietyForms.css'

const { TabPane } = Tabs;


function callback(key) {
}

export default () => (
    <div className='societyforms_main'>
        <div className='my-5'>
          <FormHeading value="Forms" subHeading="Find all society forms here" />
        </div>
  <Tabs onChange={callback} type="card">
    <TabPane tab="Land Forms" key="1" className='p-5'>
        <div className='row'>
            <div className='col-md-4'>
        <FormCard heading='NDA Form' desc='dsadhjkdsdasdhk asdkhkashkasdhjasd' img="https://www.sparkinnovations.com/wp-content/uploads/2015/04/Reciprocal-non-disclosure-form-Half.jpg"
/>
            </div> <div className='col-md-4'>

        <FormCard heading='NDA Form' desc='dsadhjkdsdasdhk asdkhkashkasdhjasd' img="https://www.sparkinnovations.com/wp-content/uploads/2015/04/Reciprocal-non-disclosure-form-Half.jpg"
/>
            </div> <div className='col-md-4'>

        <FormCard heading='NDA Form' desc='dsadhjkdsdasdhk asdkhkashkasdhjasd' img="https://www.sparkinnovations.com/wp-content/uploads/2015/04/Reciprocal-non-disclosure-form-Half.jpg"
/>
            </div>
          

        </div>
        </TabPane>
    <TabPane tab="Finance Forms" key="2" className='p-5'>
    <FormCard heading='NDA Form' desc='dsadhjkdsdasdhk asdkhkashkasdhjasd' img="https://www.sparkinnovations.com/wp-content/uploads/2015/04/Reciprocal-non-disclosure-form-Half.jpg"
/>
    </TabPane>
    <TabPane tab="Transfer Forms" key="3" className='p-5'>
    <FormCard heading='NDA Form' desc='dsadhjkdsdasdhk asdkhkashkasdhjasd' img="https://www.sparkinnovations.com/wp-content/uploads/2015/04/Reciprocal-non-disclosure-form-Half.jpg"
/>    </TabPane> <TabPane tab="Security Forms" key="4" className='p-5'>
<FormCard heading='NDA Form' desc='dsadhjkdsdasdhk asdkhkashkasdhjasd' img="https://www.sparkinnovations.com/wp-content/uploads/2015/04/Reciprocal-non-disclosure-form-Half.jpg"
/>    </TabPane> 
    <TabPane tab="Sports Forms" key="5" className='p-5'>
 <FormCard heading='NDA Form' desc='dsadhjkdsdasdhk asdkhkashkasdhjasd' img="https://www.sparkinnovations.com/wp-content/uploads/2015/04/Reciprocal-non-disclosure-form-Half.jpg"
/>    </TabPane>
  </Tabs>
    </div>
);