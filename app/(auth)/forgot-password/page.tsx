import { RequestResetPasswordForm } from "./components";

const ForgotPasswordPage: React.FC = () => {
  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden">
      <div className="flex flex-col lg:h-[250px] lg:w-[500px] bg-white border border-gray-200 shadow p-6">
        <h1 className="text-center font-bold text-2xl text-blue-500">
          Request reset password
        </h1>
        <RequestResetPasswordForm />
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
