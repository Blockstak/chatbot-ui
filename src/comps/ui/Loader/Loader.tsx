import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { RiLoader4Fill } from "react-icons/ri";

const Loader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    const handleError = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router]);

  return loading ? (
    <div className="h-screen flex justify-center items-center">
      <RiLoader4Fill className="animate-spin text-5xl text-drio-red font-bold" />
    </div>
  ) : null;
};

export default Loader;
