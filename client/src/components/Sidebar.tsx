import { Link } from "react-router-dom";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

interface SidebarLinkProps {
  to: string;
  children: React.ReactNode;
}

interface SidebarSectionProps {
  title: string;
  links: Array<{
    to: string;
    label: string;
  }>;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="block hover:text-blue-400 cursor-pointer transition-colors duration-300">
      {children}
    </Link>
  </li>
);

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, links }) => (
  <div>
    <span className="text-lg font-semibold text-blue-700">{title}</span>
    <ul className="mt-4 p-4 space-y-2 bg-white rounded-lg shadow-sm">
      {links.map((link, index) => (
        <SidebarLink key={`${title}-${index}`} to={link.to}>
          {link.label}
        </SidebarLink>
      ))}
    </ul>
  </div>
);

const Sidebar: React.FC = () => {
  const unionLinks = [
    { to: "/u/programming", label: "Programming" },
    { to: "/u/lego", label: "Lego" },
  ];

  const resourceLinks = [
    { to: "/resources/documents", label: "Documents" },
    { to: "/resources/benefits", label: "Benefits" },
    { to: "/resources/training", label: "Training" },
    { to: "/resources/legal", label: "Legal Help" },
    { to: "/resources/faq", label: "FAQ" },
  ];

  return (
    <nav className="bg-blue-100 h-full text-gray-800 p-4 space-y-8 shadow-md">
      <div className="space-y-4">
        <span className="text-lg font-semibold text-blue-700">Unions</span>
        <ul className="p-4 space-y-2 bg-white rounded-lg shadow-sm">
          {unionLinks.map((link, index) => (
            <SidebarLink key={`unions-${index}`} to={link.to}>
              {link.label}
            </SidebarLink>
          ))}
        </ul>
        <Link
          to="/create-union"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium w-full">
          <AddIcon className="w-4 h-4" />
          <span>Create Union</span>
        </Link>
      </div>
      <SidebarSection title="Resources" links={resourceLinks} />
    </nav>
  );
};

export default Sidebar;
