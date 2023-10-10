import { SignInForm } from "./components";

export default function SignInPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden">
      <div className="flex flex-col lg:h-[500px] lg:w-[500px] bg-white border border-gray-200 shadow p-6">
        <h1 className="text-center font-bold text-2xl text-blue-500">
          Sign In
        </h1>
        <SignInForm />
      </div>
    </main>
  );
}
