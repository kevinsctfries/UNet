import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-row mt-16 mb-16 flex-1">
        <div className="fixed top-16 left-0 h-full p-4 w-1/5 bg-white">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 overflow-y-auto ml-[20%] bg-gray-100">
          <div className="w-full max-w-2xl mx-auto">
            <h1 className="text-3xl">UNet</h1>
            <h2>Dashboard</h2>
            <div className="max-w-2xl bg-blue-100 rounded-lg p-4 mt-2 mb-2 shadow-md">
              <h3>This is a post</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, libero animi. Incidunt necessitatibus debitis
                mollitia quam voluptas molestiae, rem impedit cum maxime
                consectetur aliquid quos. Repudiandae earum numquam ipsa
                pariatur!
              </p>
            </div>
            <div className="max-w-2xl bg-blue-100 rounded-lg p-4 mt-2 mb-2 shadow-md">
              <h3>This is a post</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, libero animi. Incidunt necessitatibus debitis
                mollitia quam voluptas molestiae, rem impedit cum maxime
                consectetur aliquid quos. Repudiandae earum numquam ipsa
                pariatur!
              </p>
            </div>
            <div className="max-w-2xl bg-blue-100 rounded-lg p-4 mt-2 mb-2 shadow-md">
              <h3>This is a post</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, libero animi. Incidunt necessitatibus debitis
                mollitia quam voluptas molestiae, rem impedit cum maxime
                consectetur aliquid quos. Repudiandae earum numquam ipsa
                pariatur!
              </p>
            </div>
            <div className="max-w-2xl bg-blue-100 rounded-lg p-4 mt-2 mb-2 shadow-md">
              <h3>This is a post</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, libero animi. Incidunt necessitatibus debitis
                mollitia quam voluptas molestiae, rem impedit cum maxime
                consectetur aliquid quos. Repudiandae earum numquam ipsa
                pariatur!
              </p>
            </div>
            <div className="max-w-2xl bg-blue-100 rounded-lg p-4 mt-2 mb-2 shadow-md">
              <h3>This is a post</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, libero animi. Incidunt necessitatibus debitis
                mollitia quam voluptas molestiae, rem impedit cum maxime
                consectetur aliquid quos. Repudiandae earum numquam ipsa
                pariatur!
              </p>
            </div>
            <div className="max-w-2xl bg-blue-100 rounded-lg p-4 mt-2 mb-2 shadow-md">
              <h3>This is a post</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, libero animi. Incidunt necessitatibus debitis
                mollitia quam voluptas molestiae, rem impedit cum maxime
                consectetur aliquid quos. Repudiandae earum numquam ipsa
                pariatur!
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
