import { X, PhoneCall, Video } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useCallStore } from "../store/useCallStore"; 
import { Link } from "react-router-dom";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { startCall } = useCallStore(); 

  // Handle call initiation
  const handleCall = (isVideoCall) => {
    if (!selectedUser) return;
    console.log("Selected user for call:", selectedUser);
    startCall(selectedUser, isVideoCall ? "video" : "audio");
    
  };

  return (
    <div className="p-2.5 border-b border-base-300 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="avatar">
          <div className="size-10 rounded-full relative">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>

        {/* User info */}
        <div>
          <h3 className="font-medium">{selectedUser.fullName}</h3>
          <p className="text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Call buttons */}
      <div className="flex gap-8">
        <Link to="/call-screen" onClick={() => handleCall(false)}>
          <PhoneCall />
        </Link>
        <Link to="/call-screen" onClick={() => handleCall(true)}>
          <Video />
        </Link>
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
