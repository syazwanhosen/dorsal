import { FC, FormEvent, useState } from "react";
import logo from '../../assets/login/login-logo.png';
import image from '../../assets/login/image.png';
import './signup.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons

const Signup: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // State for toggling password visibility

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add authentication logic here (e.g., API call)
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="lg:body-bg ">
      <div className="flex items-center justify-center lg:h-screen lg:bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white shadow-lg rounded-2xl max-w-5xl w-full lg:w-[100%] h-[100vh] lg:h-auto">        
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start lg:px-16">
            <div className="w-full max-w-sm">
              <div className="flex justify-center items-center mb-6">
                <img src={logo} loading="lazy" width={100} height={60} alt="Login Logo" />
              </div>
              <h2 className="text-2xl font-bold mb-1 text-center lg:text-left">Sign up</h2>
              <small className="mb-6 text-zinc-500">Start your 30-day free trial.</small>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>     
                  <input
                    type="name"
                    id="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 input-bg"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div>     
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 input-bg"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Switch input type
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 input-bg"
                    placeholder="Password"
                    required
                  />
                  {/* Eye Icon for Toggling Visibility */}
                  <div className="absolute inset-y-0 mt-2 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                    <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none text-gray-500">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <span className="text-sm text-gray-700">You are agreeing to the </span>
                  <a href="#" className="text-sm primary-color hover:underline ml-1">
                    Terms of Services
                  </a> and 
                  <a href="#" className="text-sm primary-color hover:underline ml-1">
                    Privacy Policy
                  </a>        
                </div>
                <button
                  type="submit"
                  className="w-full text-white font-medium py-2 rounded login-btn">
                  Get Started
                </button>
              </form>
              <div className="space-y-4 mt-4">
                  <span className="text-sm text-gray-700">Already a member</span>
                  <a href="/login" className="text-sm primary-color hover:underline ml-1">
                    Login
                  </a>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
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

export default Signup;
