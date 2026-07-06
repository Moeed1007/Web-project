import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { loginUser } from "./services/loginApi";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email().min(10, { message: "Email must be at least 10 characters long" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  });

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
    
    const onSubmit = async (data) => {
  const result = await loginUser(data);
console.log("LOGIN RESULT:", result);
console.log("USER:", result.user);
console.log("ROLE:", result.user?.role);

  if (result.success) {
    login(result.user);
    if(result.user.role === "admin") {
     navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  } else {
    alert(result.message);
  }
};
  

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <Link to="/" className="btn btn-secondary mb-3">← Back to Home</Link>
          <div className="card">
            <div className="card-body text-center">
              <img src="/src/assets/FootballHub.jpg" alt="logo" style={{ width: '80px' }} />
              <h2 className="mt-3">GoalGear.PK</h2>
              <p className="text-muted">Login to your account</p>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" {...register("email")} />
                  {errors.email && <p className="text-danger small">{errors.email.message}</p>}
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Password" {...register("password")} />
                  {errors.password && <p className="text-danger small">{errors.password.message}</p>}
                </div>
                <button type="submit" disabled={!isValid} className="btn btn-primary w-100">Login</button>
              </form>
              <p className="mt-3">Not registered? <Link to="/signup">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;