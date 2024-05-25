import SignInForm from "../features/authentication/SignInForm";

function Login() {
  return (
    <div className="flex h-[100vh]">
      <div className="hidden flex-1 sm:block">
        {/* <img
          className="h-full w-full object-cover object-top"
          // src="https://i.redd.it/xe7w7vv4nyna1.jpg"
          alt="img"
        /> */}
        <img
          className="h-full w-full object-cover object-top"
          src="/augustine-wong-unsplash.webp"
          alt="img"
        />
      </div>
      <div className="flex-1 bg-gray-200">
        <SignInForm />
      </div>
    </div>
  );
}

export default Login;
