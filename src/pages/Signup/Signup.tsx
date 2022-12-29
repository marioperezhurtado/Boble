import { Link } from 'wouter'

import SocialLogin from '../../components/SocialLogin/SocialLogin'

export default function Signup() {
  return (
    <>
      <div className="w-full max-w-md p-6 mx-auto mt-20 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <form className="flex flex-col mt-2">
          <label htmlFor="fullname" className="pt-5">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            className="px-2 py-1.5 border rounded-md"
          />
          <label htmlFor="username" className="pt-5">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="px-2 py-1.5 border rounded-md"
          />
          <label htmlFor="password" className="pt-5">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="px-2 py-1.5 border rounded-md"
          />
          <label htmlFor="confirmPassword" className="pt-5">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="px-2 py-1.5 border rounded-md"
          />
          <button
            type="submit"
            className="py-2 mt-8 font-bold rounded-md bg-cyan-900 text-cyan-50">
            Create Account
          </button>
        </form>
        <SocialLogin />
      </div>
      <p className="mt-5 text-center">
        Already have an account?
        <Link to="/login">
          <span className="ml-1 font-bold cursor-pointer text-cyan-700">
            Log In
          </span>
        </Link>
      </p>
    </>
  )
}
