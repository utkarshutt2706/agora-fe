import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RegisterRequestDto, RegisterResponseDto } from '@/dto';
import { axiosPost } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';
import { showSuccessToast } from '@/lib/toast';
import { ROUTES } from '@/routes';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    navigate(ROUTES.login);
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
      const response = await axiosPost<RegisterRequestDto, RegisterResponseDto>(
        `${API_ENDPOINTS.register}`,
        {
          ...requestData,
          password,
        }
      );
      if (response && response.userFullName) {
        showSuccessToast(
          response.message ||
            `Welcome to Agora ${response.userFullName || 'user'}!`
        );
        handleLoginRedirect();
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='min-h-screen w-full bg-gray-200 flex items-center justify-center'>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>Create Account 🚀</CardTitle>
            <CardDescription>
              Join the Chat App and start connecting!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister}>
              <div className='mb-4'>
                <label
                  htmlFor='fullName'
                  className='block text-sm font-medium mb-1'
                >
                  Full Name
                </label>
                <input
                  id='fullName'
                  name='fullName'
                  type='text'
                  placeholder='John Doe'
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2'
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium mb-1'
                >
                  Email
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2'
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className='mb-4 relative'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium mb-1'
                >
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  className='w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2'
                  required
                  onChange={handleInputChange}
                  onBlur={handleBlur}
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

              <div className='mb-4 relative'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium mb-1'
                >
                  Confirm Password
                </label>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  className='w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2'
                  required
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <button
                  type='button'
                  className='absolute right-3 top-9 cursor-pointer'
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {(error || passwordsDoNotMatch) && (
                <div className='text-sm text-red-600 mb-4'>
                  {error || 'Passwords do not match'}
                </div>
              )}

              <Button
                type='submit'
                disabled={isLoading}
                className={`relative w-full py-2 rounded-lg font-semibold transition min-h-10 ${
                  isLoading ? 'cursor-progress' : 'cursor-pointer'
                }`}
              >
                {isLoading && <Loader2 className='animate-spin' />}
                Register
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className='w-full flex items-center justify-between text-center'>
              <span>Alredy have an account?</span>
              <Button
                onClick={handleLoginRedirect}
                className='ml-2 bg-transparent hover:bg-transparent hover:underline text-black cursor-pointer font-semibold'
              >
                Login
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Register;
