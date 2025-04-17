import { Button } from '@/components/ui/button';
import { BaseResponse, LoginRequestDto, LoginResponseDto } from '@/dto';
import { API_ENDPOINTS } from '@/lib/constants';
import { setUserDetails } from '@/lib/storage';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import spinner from '../../assets/spinner.svg';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginFormDetails, setLoginFormDetails] = useState({
    email: '',
    password: '',
  } as LoginRequestDto);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormDetails({
      ...loginFormDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post<
        LoginRequestDto,
        BaseResponse<LoginResponseDto>
      >(`${API_ENDPOINTS.login}`, loginFormDetails);
      if (response && response.data) {
        setUserDetails(response.data);
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200'>
        <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
          <h2 className='text-3xl font-bold text-center text-indigo-700 mb-2'>
            Welcome 👋
          </h2>
          <p className='text-center text-gray-500 mb-6'>
            Login to your Chat App account
          </p>

          <form onSubmit={(e) => handleLogin(e)}>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                name='email'
                placeholder='you@example.com'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
                required
                onChange={handleInputChange}
              />
            </div>

            <div className='mb-6 relative'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='••••••••'
                className='w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
                required
                onChange={handleInputChange}
              />
              <button
                type='button'
                className='absolute right-3 top-9 text-gray-500 hover:text-gray-700 cursor-pointer'
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type='submit'
              className={`relative w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition min-h-10 ${
                isLoading ? 'cursor-progress' : 'cursor-pointer'
              }`}
            >
              {isLoading && (
                <img
                  src={spinner}
                  className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'
                />
              )}
              {!isLoading && 'Login'}
            </Button>
          </form>

          <div className='mt-6 text-center'>
            <span className='text-gray-600 mb-2 mr-2'>
              Don’t have an account?
            </span>
            <Button
              onClick={handleRegisterRedirect}
              className='bg-transparent hover:bg-transparent text-indigo-600 font-medium hover:underline hover:text-indigo-800 cursor-pointer'
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
