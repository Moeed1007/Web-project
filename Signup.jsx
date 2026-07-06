import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";   
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import { signupUser } from "./services/signupApi";

function Signup() {

  const [serverMessage, setServerMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    fullName: z
    .string()
    .min(3, { message: "Full name must be atleast 3 characters long"})
    .max(50, { message: "Full name must be at most 50 characters long"}),
    email: z
    .string()
    .email({ message: "Invalid email address"})
    .min(10, { message: "Email must be atleast 10 charatcers long"}),
    password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long"})
    .max(20, { message: "Password must be at most 20 characters long"}),
    confirmPassword: z
    .string()
    .min(8, { message: "Confirm password must be atleast 8 characters long"})

  }).refine((data) => data.password === data.confirmPassword,{
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });
  const { register, handleSubmit,reset, formState: { errors, isValid } } = useForm({
     resolver: zodResolver(schema),
     mode: "onChange"
  });
   const onSubmit = async (data) => {
    console.log("Form submitted! Data:", data);
        setIsLoading(true);
        setServerMessage("");

        try {
            
            const result = await signupUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password
            });

            if (result.success) {
                setServerMessage("Success: " + result.message);
                reset(); // 
            } else {
                setServerMessage("Failed: " + result.message);
            }
        } catch (error) {
            setServerMessage(" Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <Link to="/" className="btn btn-secondary mb-3">← Back to Home</Link>
          <div className="card">
            <div className="card-body text-center">
              <img 
                src="/src/assets/foothub.jpg" 
                alt="Football"
                className="img-fluid d-block mx-auto"
                style={{width: '80px'}}
              />
              <h2 className="mt-3">Join Football Store</h2>
              <p className="text-muted">Create your account</p>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label d-block text-center">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your name" 
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-danger small mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                
                <div className="mb-3">
                  <label className="form-label d-block text-center">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email" 
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-danger small mt-1">{errors.email.message}</p>
                  )}
                  
                </div>
                
                <div className="mb-3">
                  <label className="form-label d-block text-center">Create Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Create password" 
                    {...register("password", { required: true })}
                  />
                    {errors.password && (
                    <p className="text-danger small mt-1">{errors.password.message}</p>
                  )}
                </div>
                
                <div className="mb-3">
                  <label className="form-label d-block text-center">Confirm Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Confirm password" 
                    {...register("confirmPassword", { required: true })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-danger small mt-1">{errors.confirmPassword.message}</p>
                  )}
                   
                </div>
                
                <button type="submit" disabled={!isValid} className="btn btn-success w-100">
                  Sign Up
                </button>
              </form>
              
              <div className="mt-3">
                <p className="mb-0">
                  Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;