import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useRef } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const form = useRef();
  const navigate = useNavigate(); // Import and use navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });

      // Send email notification
      emailjs
        .sendForm(
          "service_yvskmgk", // Replace with your EmailJS service ID
          "template_gjjlj3g", // Replace with your EmailJS template ID
          form.current,
          "yDyImeeMX7j23FS-d" // Replace with your EmailJS public key
        )
        .then(
          () => {
            console.log("Email sent successfully!");
          },
          (error) => {
            console.log("Email sending failed:", error.text);
          }
        );

      navigate("/profile"); // Use navigate instead of window.location.href
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="user_email" // This is needed for EmailJS to get the email address
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="user_password" // This is optional for EmailJS
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <a href="/register">Register Here</a>
      </p>
      <SignInwithGoogle />
    </form>
  );
}

export default Login;
