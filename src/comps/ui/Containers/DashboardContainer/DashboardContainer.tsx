import Header from "@/comps/Header";
import Sidebar from "@/comps/Sidebar";

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-72">
        <div className="min-h-screen relative">
          <Header />
          <div className="relative p-8 mx-auto w-full bg-neutral-800 custom-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
