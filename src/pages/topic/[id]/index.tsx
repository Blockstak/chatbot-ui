import Chat from "@/comps/Chat";
import Header from "@/comps/Header";
import Sidebar from "@/comps/Sidebar";
import Sourcebar from "@/comps/Sourcebar";
import Layout from "@/comps/Layout/Layout";
import withAuth from "@/comps/HOC/withAuth";
import { useGetTopicsQuery } from "@/api/chatbot/topics";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

function TopicId() {
  const { isLoading } = useGetTopicsQuery();
  if (isLoading) return <StaticLoader />;

  return (
    <Layout>
      <Sidebar />
      <div className="relative md:ml-[18.5rem]">
        <div className="min-h-screen relative ">
          {/* <Header /> */}
          <div className="relative mx-auto w-full custom-container h-full flex items-end ">
            <Chat />
          </div>
        </div>
      </div>
      <Sourcebar />
    </Layout>
  );
}

export default withAuth(TopicId);
// export default TopicId;
