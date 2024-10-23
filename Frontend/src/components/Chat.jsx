import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useFirebase } from "../context/Firebase"; // Adjust the import path based on your project structure

const Chat = () => {
  const { firestore } = useFirebase(); // Fetch firestore from Firebase context
  const [chatPartners, setChatPartners] = useState([]);

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
    </div>
  );
};

export default Chat;
