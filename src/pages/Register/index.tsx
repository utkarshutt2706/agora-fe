import { Button } from '@/components/ui/button';
import { BaseResponse, RegisterRequestDto, RegisterResponseDto } from '@/dto';
import { API_ENDPOINTS } from '@/lib/constants';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import spinner from '../../assets/spinner.svg';

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const [registerFormDetails, setRegisterFormDetails] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterFormDetails({
      ...registerFormDetails,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const passwordsDoNotMatch =
    touched.password &&
    touched.confirmPassword &&
    registerFormDetails.password &&
    registerFormDetails.confirmPassword &&
    registerFormDetails.password !== registerFormDetails.confirmPassword;

  const handleLoginRedirect = () => {
    navigate('/');
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const { password, confirmPassword, ...requestData } = registerFormDetails;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post<
        RegisterRequestDto,
        BaseResponse<RegisterResponseDto>
      >(`${API_ENDPOINTS.register}`, {
        ...requestData,
        password,
      });
      if (response && response.data && response.data.userId) {
        handleLoginRedirect();
      }
      // Navigate to login or home if needed
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
        <h2 className='text-3xl font-bold text-center text-indigo-700 mb-2'>
          Create Account 🚀
        </h2>
        <p className='text-center text-gray-500 mb-6'>
          Join the Chat App and start connecting!
        </p>

        <form onSubmit={handleRegister}>
          <div className='mb-4'>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Full Name
            </label>
            <input
              id='fullName'
              name='fullName'
              type='text'
              placeholder='John Doe'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
              required
              onChange={handleInputChange}
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='you@example.com'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
              required
              onChange={handleInputChange}
            />
          </div>

          <div className='mb-4 relative'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Password
            </label>
            <input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='••••••••'
              className='w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
              required
              onChange={handleInputChange}
              onBlur={handleBlur}
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

          <div className='mb-4 relative'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='••••••••'
              className='w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
              required
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <button
              type='button'
              className='absolute right-3 top-9 text-gray-500 hover:text-gray-700 cursor-pointer'
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {(error || passwordsDoNotMatch) && (
            <div className='text-sm text-red-600 mb-4'>
              {error || 'Passwords do not match'}
            </div>
          )}

          <Button
            type='submit'
            className={`relative w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition min-h-10 ${
              isLoading ? 'cursor-progress' : 'cursor-pointer'
            }`}
          >
            {isLoading ? (
              <img
                src={spinner}
                className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'
              />
            ) : (
              'Register'
            )}
          </Button>
        </form>

        <div className='mt-6 text-center'>
          <span className='text-gray-600 mb-2 mr-2'>
            Alredy have an account?
          </span>
          <Button
            onClick={handleLoginRedirect}
            className='bg-transparent hover:bg-transparent text-indigo-600 font-medium hover:underline hover:text-indigo-800 cursor-pointer'
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Register;
