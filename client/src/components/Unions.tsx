import { useEffect, useState } from "react";
import { makeRequest } from "../axios";

interface UnionType {
  id: number;
  name: string;
  slug: string;
  desc: string;
  coverPic?: string;
  profilePic?: string;
  createdAt: string;
  owner: {
    id: number;
    username: string;
    name: string;
    profilePic: string;
  };
}

interface UnionViewProps {
  slug: string;
}

const UnionView: React.FC<UnionViewProps> = ({ slug }) => {
  const [union, setUnion] = useState<UnionType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnion = async () => {
      try {
        const res = await makeRequest.get(`/unions/${slug}`);
        setUnion(res.data);
      } catch (err: Error | unknown) {
        console.error("Full error:", err);
        const error = err as { response?: { data: string } };
        setError(error.response?.data || "Failed to load union");
      } finally {
        setLoading(false);
      }
    };

    fetchUnion();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!union) return <div>Union not found</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="relative h-48 -mx-6 -mt-6 mb-4">
        <img
          src={union.coverPic || "/default-cover.png"}
          alt={`${union.name} cover`}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={union.profilePic || "/default-avatar.png"}
          alt={union.owner.username}
          className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{union.name}</h1>
          <p className="text-gray-600">Created by {union.owner.username}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-6">{union.desc}</p>
    </div>
  );
};

export default UnionView;
