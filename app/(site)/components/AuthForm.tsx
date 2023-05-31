'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/app/components/inputs/Input';

type Varient = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [varient, setVarient] = useState<Varient>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleVarient = useCallback(() => {
    if (varient === 'LOGIN') {
      setVarient('REGISTER');
    } else {
      setVarient('LOGIN');
    }
  }, [varient]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (varient === 'REGISTER') {
      // Axios Register
    }

    if (varient === 'LOGIN') {
      // NextAuth Login
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div
      className='
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
    '>
      <div
        className='
            bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
        '>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email"/>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
