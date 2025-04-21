import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BaseResponse, LoginRequestDto, LoginResponseDto } from '@/dto';
import { User } from '@/interfaces';
import { API_ENDPOINTS } from '@/lib/constants';
import { setAuthToken, setUserDetails } from '@/lib/storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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
        const decodedToken = jwtDecode<{ iat: number; sub: User }>(
          response.data.authToken
        );
        setAuthToken(response.data.authToken);
        setUserDetails(decodedToken.sub);
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
      <div className='min-h-screen w-full bg-gray-200 flex items-center justify-center'>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>Welcome 👋</CardTitle>
            <CardDescription>Login to your Chat App account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleLogin(e)}>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium mb-1'
                >
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='you@example.com'
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2'
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className='mb-6 relative'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium mb-1'
                >
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  placeholder='••••••••'
                  className='w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2'
                  required
                  onChange={handleInputChange}
                />
                <button
                  type='button'
                  className='absolute right-3 top-9 cursor-pointer'
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className='flex items-center justify-center'>
                <Button
                  type='submit'
                  className={`relative w-full py-2 rounded-lg font-semibold transition min-h-10 ${
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
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className='w-full flex items-center justify-between text-center'>
              <span>Don’t have an account?</span>
              <span
                onClick={handleRegisterRedirect}
                className='ml-2 bg-transparent hover:bg-transparent hover:underline text-black cursor-pointer font-semibold'
              >
                Register Now
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Login;
