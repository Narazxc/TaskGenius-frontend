import SignUpForm from "../features/authentication/SignUpForm";

function Signup() {
  return (
    <div className="flex h-[100vh]">
      <div className="basis-[45%] bg-gray-200">
        <SignUpForm />
      </div>
      <div className="hidden flex-1  sm:block">
        <img
          className="h-full w-full object-cover object-top"
          src="/augustine-wong-unsplash.webp"
          alt="img"
        />
      </div>
    </div>
  );
}

export default Signup;
