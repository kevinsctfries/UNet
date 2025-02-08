const Sidebar = () => {
  return (
    <div className="bg-blue-100 h-full text-gray-800 p-4 space-y-8 shadow-md">
      <div>
        <span className="text-lg font-semibold text-blue-700">Unions</span>
        <ul className="mt-4 p-4 space-y-2 bg-white rounded-lg shadow-sm">
          <li className="hover:text-blue-400 cursor-pointer transition-colors duration-300">
            Link 1
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors duration-300">
            Link 2
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors duration-300">
            Link 3
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors duration-300">
            Link 4
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors duration-300">
            Link 5
          </li>
        </ul>
      </div>
      <div>
        <span className="text-lg font-semibold text-blue-700">Resources</span>
        <ul className="mt-4 p-4 space-y-2 bg-white rounded-lg shadow-sm">
          <li className="hover:text-blue-400 cursor-pointer transition-colors duration-300">
            Link 1
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors duration-300">
            Link 2
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors duration-300">
            Link 3
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors duration-300">
            Link 4
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors duration-300">
            Link 5
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
