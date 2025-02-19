import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import UnionView from "../components/Unions";
import CreateUnion from "../components/CreateUnion";

type SortOption = "most_liked" | "trending" | "new";
type TimeframeOption =
  | "today"
  | "this_week"
  | "this_month"
  | "this_year"
  | "all_time";

const Dashboard: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>("most_liked");
  const [timeframe, setTimeframe] = useState<TimeframeOption>("today");
  const { slug, postId } = useParams<{ slug?: string; postId?: string }>();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-row mt-16 mb-16 flex-1">
        <aside className="fixed top-16 left-0 h-full w-1/5 bg-white shadow-lg">
          <Sidebar />
        </aside>
        <main className="flex-1 p-4 overflow-y-auto ml-[20%] bg-gray-100">
          <div className="w-full max-w-2xl mx-auto space-y-6">
            {location.pathname === "/create-union" ? (
              <CreateUnion />
            ) : postId ? (
              <Posts unionSlug={slug} postId={postId} singlePost />
            ) : slug ? (
              <UnionView slug={slug} />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-800">UNet</h1>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="sort"
                        className="text-sm font-medium text-gray-700">
                        Sort by:
                      </label>
                      <select
                        name="sort"
                        id="sort"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value as SortOption)}
                        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="most_liked">Most Liked</option>
                        <option value="trending">Trending</option>
                        <option value="new">New</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="timeframe"
                        className="text-sm font-medium text-gray-700">
                        Time frame:
                      </label>
                      <select
                        name="timeframe"
                        id="timeframe"
                        value={timeframe}
                        onChange={e =>
                          setTimeframe(e.target.value as TimeframeOption)
                        }
                        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="today">Today</option>
                        <option value="this_week">This Week</option>
                        <option value="this_month">This Month</option>
                        <option value="this_year">This Year</option>
                        <option value="all_time">All Time</option>
                      </select>
                    </div>
                  </div>
                </div>
                <Posts sortBy={sortBy} timeframe={timeframe} />
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
