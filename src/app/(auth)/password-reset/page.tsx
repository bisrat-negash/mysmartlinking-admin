/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Image from 'next/image';

const formSchema = z.object({
  password: z
    .string({ required_error: 'Enter a valid password!' })
    .min(8, 'Password must be at least 8 characters long!'),
});

type FormData = z.infer<typeof formSchema>;

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams(); // Use useSearchParams to get query parameters
  const token = searchParams.get('token'); // Extract the token from the URL

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing token!');
      router.push('/'); // Redirect to home if token is missing
    }
  }, [token, router]);

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error('Token is missing!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/v1/auth/reset-password`,
        {
          password: data.password,
          token: token, // Ensure token is passed as a string
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      toast.success(response.data.message);
      reset(); // Clear the form
      router.push('/signin'); // Redirect to sign-in page
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Request failed!');
      console.error('Request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Toaster />
      <div className="w-full max-w-xl h-[500px] p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mb-6">
          <Image
            width={113}
            height={36}
            src="/SmartLinking/logo.png"
            alt="logo"
            className="img-fluid"
          />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Reset Your Password
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2 pb-10">
          Enter your new password to reset your account password.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`block w-full px-4 mt-4 py-4 text-sm border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-4 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
            ) : (
              'Submit'
            )}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Remember your password?{' '}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;