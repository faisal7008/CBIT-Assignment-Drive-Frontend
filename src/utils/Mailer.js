import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = (props) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("gmail", "template_eyxugj3", form.current, "MvyQei-HyWgW-YDSH")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" value={props.user_name} />
      <label>Email</label>
      <input type="email" name="user_email" value={props.user_email} />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export const sendSubmissionEmail = (to_name, to_email, message) => {
  var formData = {
    from_name: "CBIT Admin",
    to_email: to_email,
    to_name: to_name,
    message: message,
  };

  emailjs
    .send(
      "service_yavl57p",
      "template_eyxugj3",
      formData,
      "MvyQei-HyWgW-YDSH"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};

export const sendAssignmentEmail = (to_name, to_email, teacher, assignmentname, totalmarks, deadline) => {
  var formData = {
    teacher: teacher,
    to_email: to_email,
    to_name: to_name,
    assignmentname: assignmentname,
    createdby: teacher,
    totalmarks: totalmarks,
    deadline: deadline
  };

  emailjs
    .send(
      "service_yavl57p",
      "template_ds4y83x",
      formData,
      "MvyQei-HyWgW-YDSH"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};

