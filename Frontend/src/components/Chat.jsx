import React, { useEffect, useState } from "react";
import { getDocs, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { useFirebase } from "../context/Firebase"; // Adjust the import path based on your project structure
import { useParams } from "react-router-dom";  // <-- Added to handle dynamic chat IDs

const Chat = () => {
  const { firestore, user } = useFirebase(); // Fetch user from Firebase context
  const { chatId } = useParams();  // <-- Get chatId from URL params
  const [chatPartners, setChatPartners] = useState([]);
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch chat partners
  useEffect(() => {
    const fetchChatPartners = async () => {
      const chatPartnersRef = collection(firestore, "chatPartners");
      const chatPartnersSnapshot = await getDocs(chatPartnersRef);
      const partners = chatPartnersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChatPartners(partners);
    };

    fetchChatPartners();
  }, [firestore]);

  // Fetch the chat based on chatId
  useEffect(() => {
    const fetchChat = async () => {
      if (!chatId) return;
      const chatRef = doc(firestore, "chats", chatId);
      const chatSnapshot = await getDoc(chatRef);
      if (chatSnapshot.exists()) {
        setChat(chatSnapshot.data());
      }
    };

    fetchChat();
  }, [chatId, firestore]);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const chatRef = doc(firestore, "chats", chatId);
    const chatSnapshot = await getDoc(chatRef);

    if (chatSnapshot.exists()) {
      const chatData = chatSnapshot.data();
      const updatedMessages = [
        ...chatData.messages,
        {
          senderId: user.uid,
          message,
          timestamp: new Date(),
        },
      ];

      await updateDoc(chatRef, { messages: updatedMessages });
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="bg-gray-50 p-5 rounded shadow border border-n-9 h-[70vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Chat Partners</h2>
      <div className="space-y-4">
        {chatPartners.map((partner) => (
          <div key={partner.id} className="bg-white p-4 rounded shadow border border-n-9 flex items-center">
            <img
              src={partner.photoURL || "default-avatar-url.jpg"} // Use a default avatar if not available
              alt={partner.displayName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-semibold">{partner.displayName}</span>
          </div>
        ))}
      </div>

      {chat && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Chat Messages</h3>
          <div className="chat-box h-40 overflow-y-auto border border-gray-300 p-4 mt-2">
            {chat.messages.map((msg, index) => (
              <div key={index} className={msg.senderId === user.uid ? "text-right" : "text-left"}>
                <p className="bg-gray-200 p-2 rounded">{msg.message}</p>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 border rounded p-2 w-full"
            placeholder="Type a message"
          />
          <button onClick={handleSendMessage} className="mt-2 bg-blue-500 text-white p-2 rounded">
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
