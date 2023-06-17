'use client'

import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import Input from '@/app/components/inputs/Input'
import Button from '@/app/components/Button'
import AuthSocialButton from './AuthSocialButton'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setvariant] = useState<variant>('LOGIN')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(
    // This code checks if the user is authenticated and redirects
    // them to the users page if they are
    () => {
      // Check if the user is authenticated
      if (session?.status === 'authenticated') {
        // If so, redirect to the users page
        router.push('/users')
      }
    },
    [session?.status, router]
  )

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      // If the variant is login, change it to register
      setvariant('REGISTER')
    } else {
      // Otherwise, change it to login
      setvariant('LOGIN')
    }
  }, [variant])

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
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Set loading state
    setIsLoading(true)

    // If the user has selected to register, send the data to the backend.
    if (variant === 'REGISTER') {
      // Make a POST request to the backend API to register the user.
      axios
        .post('/api/register', data)
        // If successful, sign the user in using their credentials.
        .then(() => signIn('credentials', data))
        // If unsuccessful, display an error to the user.
        .catch(() => toast.error('Something went wrong!'))
        // Regardless of success or failure, stop loading.
        .finally(() => setIsLoading(false))
    }

    // 1. Check if the variant is LOGIN
    if (variant === 'LOGIN') {
      // 2. If the variant is LOGIN, call signIn
      signIn('credentials', {
        // 3. Spread the data object into the credentials object
        ...data,
        // 4. Disable redirecting after login
        redirect: false,
      })
        // 5. Handle the response
        .then((callback) => {
          // 6. If the response is an error, show an error toast
          if (callback?.error) {
            toast.error('Invalid credentials')
          }

          // 7. If the response is successful and there is no error, show a success toast
          if (callback?.ok && !callback?.error) {
            toast.success('Logged in!')
          }
        })
        // 8. No matter what, set isLoading to false
        .finally(() => setIsLoading(false))
    }
  }
  // social logins
  const socialAction = (action: string) => {
    // set loading to true
    setIsLoading(true)

    // call signIn and pass in the current action
    signIn(action, { redirect: false })
      .then((callback) => {
        // if the callback error is true, show error message
        if (callback?.error) {
          toast.error('Invalid credentials')
        }

        // if the callback ok is true and no error, show success message
        if (callback?.ok && !callback?.error) {
          toast.success('Logged in!')
        }
      })
      // set loading to false
      .finally(() => setIsLoading(false))
  }

  return (
    <div
      className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
      "
    >
      <div
        className="
            bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
        "
      >
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                    absolute
                    inset-0
                    flex
                    items-center
                  "
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div
              className="relative 
            flex 
            justify-center 
            text-sm"
            >
              <span
                className="
                bg-white 
                px-2 
                text-gray-500"
              >
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2
            text-gray-500 
          "
        >
          <div>
            {variant === 'LOGIN'
              ? 'New to Messenger?'
              : 'Already have an account?'}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Sign in'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
