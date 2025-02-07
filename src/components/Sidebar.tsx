const Sidebar = () => {
  return (
    <div className="bg-blue-100 h-full text-gray-800 p-0 space-y-8">
      <div>
        <span className="text-lg font-semibold">Links Section</span>
        <ul className="mt-4 space-y-2">
          <li className="hover:text-blue-400 cursor-pointer">Link 1</li>
          <li className="hover:text-blue-400 cursor-pointer">Link 2</li>
          <li className="hover:text-blue-400 cursor-pointer">Link 3</li>
          <li className="hover:text-blue-400 cursor-pointer">Link 4</li>
          <li className="hover:text-blue-400 cursor-pointer">Link 5</li>
        </ul>
      </div>
      <div>
        <span className="text-lg font-semibold">Resources</span>
        <ul className="mt-4 space-y-2">
          <li className="hover:text-blue-400 cursor-pointer">Link 1</li>
          <li className="hover:text-blue-400 cursor-pointer">Link 2</li>
          <li className="hover:text-blue-400 cursor-pointer">Link 3</li>
          <li className="hover:text-blue-400 cursor-pointer">Link 4</li>
          <li className="hover:text-blue-400 cursor-pointer">Link 5</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
