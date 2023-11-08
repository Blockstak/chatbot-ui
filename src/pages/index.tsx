import Chat from "@/comps/Chat";
import Header from "@/comps/Header";
import Sidebar from "@/comps/Sidebar";
import Sourcebar from "@/comps/Sourcebar";
import Layout from "@/comps/Layout/Layout";
import withAuth from "@/comps/HOC/withAuth";

function Home() {
  return (
    <Layout>
      <Sidebar />
      <div className="relative md:ml-[20rem]">
        <div className="min-h-screen relative">
          <Header />
          <div className="relative mx-auto w-full bg-neutral-800 custom-container h-full flex items-end">
            <Chat />
          </div>
        </div>
      </div>
      <Sourcebar />
    </Layout>
  );
}

export default withAuth(Home);
