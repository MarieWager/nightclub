import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Your Name" {...register("Your Name", { required: true })} />
      <input type="text" placeholder="Your Email" {...register("Your Email", { required: true })} />
      <input type="number" placeholder="Table Number" min={1} max={15} /*ved at tilføje min/max i html vil user ikke kunne vælge højere end 15 -> uden vil det kun være efter submit/validering at der React siger der er fejl*/ {...register("Table Number", { required: true, max: 15 })} />
      <select {...register("Number of Guests", { required: true })}>
        <option value="1">1</option>
        <option value=" 2"> 2</option>
        <option value=" 3"> 3</option>
        <option value=" 4"> 4</option>
        <option value=" 5"> 5</option>
        <option value=" 6"> 6</option>
        <option value=" 7"> 7</option>
        <option value=" 8"> 8</option>
      </select>
      <input type="datetime-local" placeholder="Select Date" {...register("Select Date", { required: true })} />
      <input type="tel" placeholder="Your Mobile Number" {...register("Your Mobile Number", { required: true })} />
      <textarea {...register("Your Comment", { maxLength: 250 })} />

      <input type="submit" />
    </form>
  );
}