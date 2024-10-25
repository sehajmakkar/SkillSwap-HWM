import React, { useState, useEffect } from 'react';
import { useFirebase } from '../../context/Firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from '../../components/Button';

const AllChat = () => {
  const { firebaseAuth, firestore, storage } = useFirebase();
  const [user] = useAuthState(firebaseAuth);  // Get current user
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!user) return;

    // Fetch chat messages ordered by timestamp
    const q = query(collection(firestore, 'doubtChats'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(chatMessages);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' && !image) return;

    let imageURL = '';
    if (image) {
      const imageRef = ref(storage, `chat-images/${Date.now()}-${image.name}`);
      const uploadResult = await uploadBytes(imageRef, image);
      imageURL = await getDownloadURL(uploadResult.ref);
      setImage(null);  // Reset the image input
    }

    try {
      await addDoc(collection(firestore, 'doubtChats'), {
        message: newMessage,
        imageURL,
        userId: user.uid,
        displayName: user.displayName || user.email,
        timestamp: new Date(),
      });
      setNewMessage('');  // Clear input after sending
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="h2 font-bold text-color-1 mb-6">Login to chat</h1>
        <div className="flex space-x-4">
          <Button href="/signup" className="button text-black px-4 py-2 rounded-md">
            Sign Up
          </Button>
          <Button href="/login" className="button  text-black px-4 py-2 rounded-md">
            Login
          </Button>
        </div>
      </div>
    );
  }
  

  return (
    <div className="chat-container p-6 bg-gray-100 h-full flex flex-col" style={{ marginTop: '60px' }}> {/* Moved down by 60px for header space */}
      <div className="chat-messages bg-white p-4 rounded-md shadow-md h-[70vh] overflow-y-scroll mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message mb-4 p-3 rounded-md shadow-md ${
              msg.userId === user.uid ? 'bg-blue-100 text-right ml-auto' : 'bg-gray-200 text-left mr-auto'
            }`}
          >
            <div className={`flex items-center mb-1 ${msg.userId === user.uid ? 'justify-end' : 'justify-start'}`}>
              <strong className={`text-purple-500 ${msg.userId === user.uid ? 'ml-2' : 'mr-2'}`}>{msg.displayName}</strong> {/* Sender on right, receiver on left */}
              <span className="text-gray-500 text-sm">{new Date(msg.timestamp?.seconds * 1000).toLocaleTimeString()}</span>
            </div>
            <p>{msg.message}</p>
            {msg.imageURL && (
              <div className="mt-2">
                <img src={msg.imageURL} alt="chat image" className="max-w-full h-auto rounded-md" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-md bg-white text-black"
          placeholder="Type your message..."
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="p-2 border border-gray-300 rounded-md ml-2"
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-md">Send</button>
      </div>
    </div>
  );
};

export default AllChat;
