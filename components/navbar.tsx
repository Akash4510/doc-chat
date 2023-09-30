import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { UserButton, auth } from '@clerk/nextjs';

import MaxWidthWrapper from './max-width-wrapper';
import { buttonVariants } from './ui/button';

const Navbar = () => {
  const { userId } = auth();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all text-lg">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span className="text-xl">QuillSight.</span>
          </Link>

          {/* TODO: Add mobile navar */}
          <div className="hidden items-center space-x-3 sm:flex">
            <Link
              href="/pricing"
              className={buttonVariants({
                variant: 'ghost',
              })}
            >
              Pricing
            </Link>
            {userId ? (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: 'ghost',
                  })}
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    variant: 'ghost',
                  })}
                >
                  Log in
                </Link>
                <Link href="/sign-up" className={buttonVariants()}>
                  Get started <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
