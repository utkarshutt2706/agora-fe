import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

function Login() {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login submitted');
  };

  const handleRegisterRedirect = () => {
    console.log('navigate to registration');
  };

  const [showPassword, setShowPassword] = useState(false);
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
                type='email'
                id='email'
                name='email'
                placeholder='you@example.com'
                required
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
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
                required
                className='w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
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

            <button
              type='submit'
              className='w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer'
            >
              Login
            </button>
          </form>

          <div className='mt-6 text-center'>
            <span className='text-gray-600 mb-2 mr-2'>
              Don’t have an account?
            </span>
            <button
              onClick={handleRegisterRedirect}
              className='text-indigo-600 font-medium hover:underline hover:text-indigo-800 cursor-pointer'
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
