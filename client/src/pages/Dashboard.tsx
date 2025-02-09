import Footer from "../components/Footer";
import Header from "../components/Header";
import Posts from "../components/Posts";
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
            <select name="sort" id="sort">
              <option value="most_liked">Most Liked</option>
              <option value="trending">Trending</option>
              <option value="new">New</option>
            </select>

            <select name="timeframe" id="timeframe">
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="this_year">This Year</option>
              <option value="all_time">All Time</option>
            </select>

            <Posts />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
