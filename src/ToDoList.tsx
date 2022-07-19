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

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password1: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input {...register("firstName", { required: "write here", minLength: 10 })} placeholder="First Name" />
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName", { required: "write here" })} placeholder="Last Name" />
        <span>{errors?.lastName?.message}</span>
        <input {...register("userName", { required: "write here" })} placeholder="Username" />
        <span>{errors?.userName?.message}</span>
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
        <span>{errors?.password?.message}</span>
        <input {...register("password1", { required: "write again" })} placeholder="Password check" />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
