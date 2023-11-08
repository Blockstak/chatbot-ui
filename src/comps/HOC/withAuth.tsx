import { useRouter } from "next/router";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

import axios from "axios";
import { getToken } from "@/utils/token";
import { useEffect, useState } from "react";
import { setAuthenticated } from "@/state/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

function withAuth(OriginalComponent: React.FC) {
  function AuthenticatedComponent() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const url = process.env.API_URL;

    useEffect(() => {
      async function validateToken() {
        try {
          const res = await axios.post(`${url}/accounts/api/token/verify/`, {
            token: getToken(),
          });

          if (res.status === 200) {
            dispatch(setAuthenticated(true));
          } else {
            dispatch(setAuthenticated(false));
          }
        } catch (error) {
          dispatch(setAuthenticated(false));
        } finally {
          setLoading(false);
        }
      }

      validateToken();
    }, [dispatch, router, url]);

    if (loading) return <StaticLoader />;

    if (!isAuthenticated) {
      router.push("/auth/login");
      return null;
    }

    return <OriginalComponent />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
