import Header from "@/comps/Header";
import Sidebar from "@/comps/Sidebar";
import Layout from "@/comps/Layout/Layout";
import withAuth from "@/comps/HOC/withAuth";
import { useGetTopicsQuery } from "@/api/chatbot/topics";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

function Home() {
  const { isLoading } = useGetTopicsQuery();
  if (isLoading) return <StaticLoader />;

  return (
    <Layout>
      <Sidebar />
      <div className="relative md:ml-[20rem]">
        <div className="min-h-screen relative">
          <Header />
          <div className="relative mx-auto w-full bg-neutral-800 custom-container h-full flex items-center justify-center">
            <div>
              <h2 className="text-center text-neutral-200 text-2xl md:text-4xl">
                Profile
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Home);
