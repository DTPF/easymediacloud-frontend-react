import { routes } from './paths';
import { useDauth } from 'dauth-context-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function EnsureAuthenticated({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useDauth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate(routes.home);
    }
  }, [isAuthenticated, isLoading, navigate]);

  return <>{children}</>;
}
