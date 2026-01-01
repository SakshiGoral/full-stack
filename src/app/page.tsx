import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import Logo from '@/components/logo';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4 sm:p-6 md:p-8">
       <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
       <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow animation-delay-300" />
      <div className="w-full max-w-md z-10">
        <div className="mb-8 flex justify-center animate-fade-in-up">
          <Logo />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
