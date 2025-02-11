import { useState, useRef } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface CreatePostProps {
  onSubmit: (content: string, image?: File) => Promise<void>;
  onCancel: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    await onSubmit(content, image || undefined);
    setContent("");
    setImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please select an image file");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Create a Post</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="post-content"
            className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="post-content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            placeholder="What would you like to share?"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 border-2 border-gray-300 bg-white hover:bg-gray-50 rounded-full px-4 py-2 transition-all duration-200">
            <AttachFileIcon className="text-gray-600" />
            <span className="text-gray-600 text-sm">
              {image ? "Image selected" : "Attach image"}
            </span>
          </button>
          {image && <span className="text-sm text-gray-500">{image.name}</span>}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 border-2 border-blue-600 bg-white hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md">
            <span className="text-blue-600 font-medium">Create Post</span>
          </button>
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 border-2 border-gray-600 bg-white hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md">
            <span className="text-gray-600 font-medium">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
