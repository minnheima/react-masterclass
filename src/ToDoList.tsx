import { AnyARecord } from "dns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setToDo(value);
//   };
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(toDo);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    // console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: true })} placeholder="Email" />
        <input {...register("firstName", { required: true, minLength: 10 })} placeholder="First Name" />
        <input {...register("lastName", { required: true })} placeholder="Last Name" />
        <input {...register("username", { required: true })} placeholder="Username" />
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "your password is too short!",
            },
          })}
          placeholder="Password"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
