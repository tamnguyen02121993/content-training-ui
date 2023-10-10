import { ResetPasswordForm } from "./components";

const ResetPasswordPage: React.FC = () => {
  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden">
      <div className="flex flex-col lg:h-[500px] lg:w-[500px] bg-white border border-gray-200 shadow p-6">
        <h1 className="text-center font-bold text-2xl text-blue-500">
          Reset password
        </h1>
        <ResetPasswordForm />
      </div>
    </main>
  );
};

export default ResetPasswordPage;
