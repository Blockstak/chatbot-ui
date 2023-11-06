import Chat from "@/comps/Chat";
import Header from "@/comps/Header";
import Sidebar from "@/comps/Sidebar";
import Layout from "@/comps/Layout/Layout";
import DashboardContainer from "@/comps/ui/Containers/DashboardContainer";

export default function Home() {
  return (
    <Layout>
      <Sidebar />
      <div className="relative md:ml-72">
        <div className="min-h-screen relative">
          <Header />
          <div className="relative mx-auto w-full bg-neutral-800 custom-container h-full flex items-end">
            <Chat />
          </div>
        </div>
      </div>
    </Layout>
  );
}
