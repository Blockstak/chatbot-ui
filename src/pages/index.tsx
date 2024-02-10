import Chat from "@/comps/Chat";
import Header from "@/comps/Header";
import Sidebar from "@/comps/Sidebar";
import Sourcebar from "@/comps/Sourcebar";
import Layout from "@/comps/Layout/Layout";
import withAuth from "@/comps/HOC/withAuth";
import { useGetTopicsQuery } from "@/api/chatbot/topics";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import RobotSvg from "@/comps/ui/SVG/RobotSvg";

function Home() {
  const { isLoading } = useGetTopicsQuery();
  if (isLoading) return <StaticLoader />;

  return (
    <Layout>
      <Sidebar />
      <div className="relative md:ml-[20rem]">
        <div className="min-h-screen relative">
          {/* <Header /> */}
          <div className="relative mx-auto w-full  custom-container h-full flex items-center justify-center">
            <div>
              <div className=" flex justify-center">
                <RobotSvg />
              </div>

              <h2 className="text-center text-[#9CA3AF] text-2xl md:text-4xl font-semibold">
                How can I assist you today?
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Home);
