import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    const [loggedInUser, setLoggedInUser] = useState ({});
  
    console.log(watch("example"));
  
    return (
      <form className="ship-form" defaultValue={loggedInUser.name} onSubmit={handleSubmit(onSubmit)}>

        <input name="name" ref={register({ required: true })} placeholder="Name" />
        {errors.name && <span className="error">This field is required</span>}

        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Email" />
        {errors.email && <span className="error">Email is required</span>}

        <input name="Address" ref={register({ required: true })} placeholder="Address" />
        {errors.Address && <span className="error">Address is required</span>}

        <input name="phone" ref={register({ required: true })} placeholder="Phone" />
        {errors.phone && <span className="error">Phone is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;