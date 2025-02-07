import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-row mt-16 mb-16 flex-1">
        <div className="fixed top-16 left-0 h-full w-1/5 bg-white">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 overflow-y-auto ml-[20%] bg-gray-100">
          <div className="w-full max-w-2xl mx-auto">
            <h1 className="text-3xl">UNet</h1>
            <h2>Dashboard</h2>
            <div className="bg-blue-100 p-4 rounded-lg">
              <textarea className="bg-white w-full" placeholder="Text here" />
              <button className="bg-blue-300 py-1 px-4 rounded-lg mt-2">
                Post
              </button>
            </div>
            <div className="max-w-2xl bg-blue-100 rounded-lg p-4 mt-2 mb-2 shadow-md">
              <p>No posts yet</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
