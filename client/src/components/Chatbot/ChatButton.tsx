import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg hover:shadow-2xl transition-all z-40 ${
        isOpen
          ? "bg-gray-500 hover:bg-gray-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white`}
      aria-label="Open chat"
    >
      <MessageCircle size={24} />
    </button>
  );
};
