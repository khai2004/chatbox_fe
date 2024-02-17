import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthInput from './AuthInput';
import { signUpSchema } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/userApiSlice';
import { setCredentials } from '../../features/userSlice';
import { useState } from 'react';
import Picture from './Picture';
import axios from 'axios';

const RegisterForm = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [picture, setPicture] = useState();
  const [readablePicture, setRedablePicture] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (picture) {
        // Upload cloudinary and then register user
        let { secure_url } = await uploadImage();
        const res = await registerUser({
          ...data,
          picture: secure_url,
        }).unwrap();
        dispatch(setCredentials({ ...res.user }));
        navigate('/');
      } else {
        const res = await registerUser({ ...data, picture: '' }).unwrap();
        console.log(res.user);
        dispatch(setCredentials({ ...res.user }));
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append('upload_preset', process.env.REACT_APP_CLOUD_SECRET);
    formData.append('file', picture);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
    return data;
  };
  // console.log('values', watch());
  // console.log('error', errors);
  return (
    <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
      {/* Container */}
      <div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>
        {/* Heading */}
        <div className='text-center dark:text-dark_text_1'>
          <h2 className='mt6 text-3xl font-bold'>Welcome</h2>
          <p className='mt-2 text-sm'>Sign up</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-6'>
          <AuthInput
            name='name'
            type='text'
            placeholder='Full Name'
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name='email'
            type='text'
            placeholder='Email address'
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name='status'
            type='text'
            placeholder='Status (Optional)'
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name='password'
            type='password'
            placeholder='Password'
            register={register}
            error={errors?.password?.message}
          />

          <Picture
            readablePicture={readablePicture}
            setRedablePicture={setRedablePicture}
            setPicture={setPicture}
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
            <span>Have an account?</span>
            <Link
              href='/login'
              className='  hover:underline cursor-pointer transition ease-in duration-300'
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
