import  { useState, FC, FormEvent} from "react";
import logo from '../../assets/login/login-logo.png';
import image from '../../assets/login/login-image.png';
import google from '../../assets/login/Googlee.svg';
import facebook from '../../assets/login/Facebook.svg';
import './login.css'; 

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
 
  };

  return (
    <div className="lg:body-bg ">
    <div className="flex items-center justify-center lg:h-screen bg-gray-100">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white shadow-lg rounded-2xl max-w-5xl w-full lg:w-[100%] h-[100vh] lg:h-auto"> 
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start lg:px-16">
          <div className="w-full max-w-sm">
            <div className="flex justify-center items-center mb-6">
              <img src={logo} loading="lazy" width={100} height={60} alt="Login Logo" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 input-bg"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 input-bg"
                  placeholder="***********"
                  required
                />
              </div>
              <div className="text-right">
                <a href="#" className="text-sm hover:underline primary-color">
                  Forgot password?
                </a>
              </div>
              <button
    type="submit"
    className="w-full text-white font-medium py-2 rounded login-btn"
    onClick={() => window.location.href = "/account"}
>
    Login
</button>

            </form>
            <div className="space-y-4 mt-6">
              {/* Google Sign-In Button */}
              <button className="w-full flex btn-radius items-center justify-center bg-white border border-gray-300 shadow-md rounded px-4 py-2 hover:bg-gray-100">
                <img
                  src={google}
                  alt="Google Logo"
                  className="w-5 h-5 mr-2"
                />
                <span className="text-gray-700">Sign in with Google</span>
              </button>
              {/* Facebook Sign-In Button */}
              <button className="w-full flex btn-radius items-center justify-center bg-white border border-gray-300 shadow-md rounded px-4 py-2 hover:bg-gray-100">
                <img
                  src={facebook}
                  alt="Facebook Logo"
                  className="w-5 h-5 mr-2 bg-white rounded-full"
                />
                <span>Sign in with Facebook</span>
              </button>
              <div className="text-center mt-4">
                <span className="text-sm text-gray-700">Don’t have an account?</span>
                <a href="/signup" className="text-sm primary-color hover:underline ml-1">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
  
        <div className="hidden lg:flex flex-1 justify-end items-end primary-bg rounded">
  <img
    src={image}
    alt="Login Illustration"
    className="rounded-lg w-full max-w-md"
  />
</div>

      </div>
    </div>
  </div>
  
  );
};

export default Login;
