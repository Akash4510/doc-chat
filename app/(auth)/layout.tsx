const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
