export default function Login() {
  return (
    <div className="w-full max-w-md p-6 mx-auto mt-20 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold">Login to your account</h1>
      <form className="flex flex-col mt-2">
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
        <button
          type="submit"
          className="py-2 mt-8 font-bold rounded-md bg-cyan-900 text-cyan-50">
          Login
        </button>
      </form>
    </div>
  )
}
