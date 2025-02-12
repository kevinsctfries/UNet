import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { makeRequest } from "../axios";
import { AxiosError } from "axios";
import { AuthContext } from "../context/authContext";
import { useCloudinary } from "../hooks/useCloudinary";

interface AuthContextType {
  currentUser: {
    id: number;
    username: string;
  } | null;
}

const CreateUnion: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(
    AuthContext as React.Context<AuthContextType>
  );
  const { uploadImage, uploading } = useCloudinary();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverPic, setCoverPic] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    try {
      if (!currentUser) {
        throw new Error("Please log in to create a union");
      }

      let coverPicUrl = null;
      let profilePicUrl = null;

      if (coverPic) {
        coverPicUrl = await uploadImage(coverPic);
      }

      if (profilePic) {
        profilePicUrl = await uploadImage(profilePic);
      }

      const unionData = {
        name,
        desc: description,
        ...(coverPicUrl && { coverPic: coverPicUrl }),
        ...(profilePicUrl && { profilePic: profilePicUrl }),
      };

      const response = await makeRequest.post("/unions", unionData);
      navigate(`/u/${response.data.slug}`);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error("Union creation error:", err);
      setError(
        (axiosError.response?.data as string) || "Failed to create union"
      );
    }
  };

  const handleFileChange = (
    type: "cover" | "profile",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (type === "cover") {
        setCoverPic(file);
      } else {
        setProfilePic(file);
      }
    } else {
      alert("Please select an image file");
    }
  };

  if (!currentUser) {
    return <div>Please log in to create a union</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Create a Union</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="union-name"
              className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              id="union-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter union name"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="union-description"
              className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="union-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe your union"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <input
                type="file"
                ref={coverInputRef}
                onChange={e => handleFileChange("cover", e)}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => coverInputRef.current?.click()}
                className="inline-flex items-center gap-2 border-2 border-gray-300 bg-white hover:bg-gray-50 rounded-full px-4 py-2 transition-all duration-200">
                <AttachFileIcon className="text-gray-600" />
                <span className="text-gray-600 text-sm">
                  {coverPic ? "Cover image selected" : "Add cover image"}
                </span>
              </button>
              {coverPic && (
                <span className="block text-sm text-gray-500 mt-1">
                  {coverPic.name}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              <input
                type="file"
                ref={profileInputRef}
                onChange={e => handleFileChange("profile", e)}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => profileInputRef.current?.click()}
                className="inline-flex items-center gap-2 border-2 border-gray-300 bg-white hover:bg-gray-50 rounded-full px-4 py-2 transition-all duration-200">
                <AttachFileIcon className="text-gray-600" />
                <span className="text-gray-600 text-sm">
                  {profilePic ? "Profile image selected" : "Add profile image"}
                </span>
              </button>
              {profilePic && (
                <span className="block text-sm text-gray-500 mt-1">
                  {profilePic.name}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="inline-flex items-center gap-2 border-2 border-blue-600 bg-white hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="text-blue-600 font-medium">
                {uploading ? "Creating..." : "Create Union"}
              </span>
            </button>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 border-2 border-gray-600 bg-white hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md">
              <span className="text-gray-600 font-medium">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUnion;
