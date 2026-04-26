'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('reader' | 'author')[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { role, token } = useAuth();

  React.useEffect(() => {
    if (!token || !role) {
      router.push('/');
    } else if (allowedRoles && !allowedRoles.includes(role as 'reader' | 'author')) {
      router.push('/');
    }
  }, [token, role, allowedRoles, router]);

  if (!token || !role || (allowedRoles && !allowedRoles.includes(role as 'reader' | 'author'))) {
    return <div>Redirecting...</div>;
  }

  return <>{children}</>;
}
