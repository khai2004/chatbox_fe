import { useLoginMutation } from '../../features/userApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '../../utils/validation';
import { setCredentials } from '../../features/userSlice';
import AuthInput from './AuthInput';
import { PulseLoader } from 'react-spinners';

const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser({ ...data }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res.user }));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
      {/* Container */}
      <div className='max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>
        {/* Heading */}
        <div className='text-center dark:text-dark_text_1'>
          <h2 className='mt6 text-3xl font-bold'>Welcome back</h2>
          <p className='mt-2 text-sm'>Sign in</p>
        </div>
        {/* Form */}
        <form className='mt-6 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            name='email'
            type='text'
            placeholder='Email address'
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name='password'
            type='password'
            placeholder='Password'
            register={register}
            error={errors?.password?.message}
          />

          {/* Submit button */}
          <button
            type='submit'
            className='w-full flex justify-center bg-green_1 text-green-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
          >
            {isLoading ? <PulseLoader color='#ecfdf5' size={16} /> : 'Sign up'}
          </button>
          {/* Sign in link */}
          <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
            <span>Do not have an account?</span>
            <Link
              href='/register'
              className='  hover:underline cursor-pointer transition ease-in duration-300'
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
