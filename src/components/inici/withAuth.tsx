import { useEffect, ComponentType } from "react";
import Router from "next/router";
import { getSession } from "./auth";

interface Props {}

export function withAuth<P extends Props>(Component: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    useEffect(() => {
      const checkAuth = async () => {
        const session = await getSession();
        if (!session) {
          // Redirect to login page if not authenticated (only on the client side)
          if (typeof window !== 'undefined') {
            Router.push("/inici");
          }
        }
      };

      checkAuth();
    }, []);

    return <Component {...props} />;
  };
}

/*
Teòricament és per evitar la connexió il·lícita a /dashboard sense haver entrat el login correte
Dona errors amb el useRouter, ja que estem dins la carpeta app
*/
