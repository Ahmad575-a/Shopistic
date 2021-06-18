import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../css/login.css';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const Login = () => {
  // YUP validation
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    // display form data on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
  };

  // Social Login Function
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const getValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const localLogin = (e) => {
    e.preventDefault();
    axios.post('/signin/passport/local', user).then((res) => {
      console.log('Data from backend Local', res.data);
      window.location.href = '/profile/' + res.data._id; // localhost:3000/profile/:id
    });
  };

  return (
    <div className='col-md-12'>
      <div className='card card-container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className='form-group'>
            <label>Email</label>
            <input
              name='email'
              type='text'
              onChange={getValue}
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className='invalid-feedback'>{errors.email?.message}</div>
          </div>
          {/* Password */}
          <div className='form-group'>
            <label>Password</label>
            <input
              name='password'
              type='password'
              onChange={getValue}
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className='invalid-feedback'>{errors.password?.message}</div>
          </div>
          {/* Button */}
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </div>
          <div class='hide-md-lg'>
            <p>Or sign in with:</p>
          </div>
          <div className='form-group'>
            <a
              href='http://localhost:5000/signin/passport/facebook'
              class='fb btn'
            >
              <i class='fa fa-facebook fa-fw'></i> Login with Facebook
            </a>
            <a
              href='http://localhost:8000/signin/passport/gmail'
              class='google btn'
            >
              <i class='fa fa-google fa-fw'></i> Login with Gmail
            </a>
          </div>
          <p className='forgot-password text-left'>
            New to Storeverse <a href='/register'> Register?</a>
          </p>
        </form>
      </div>
    </div>
  );
};
<<<<<<< HEAD
=======


>>>>>>> accepted changes
