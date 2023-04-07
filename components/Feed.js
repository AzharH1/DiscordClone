import { db } from "@/firebase";
import { HashtagIcon } from "@heroicons/react/24/solid";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

function Feed({ serverId }) {
  const router = useRouter();
  const channelId = router.query.channelId;
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!channelId) return;

    async function getChannelName() {
      const docSnap = await getDoc(
        doc(db, "servers", serverId, "channels", channelId)
      );
      setChannelName(docSnap.data()?.name);
    }
    getChannelName();
  }, [channelId]);

  useEffect(() => {
    if (!channelId) return;
    const q = query(
      collection(db, "servers", serverId, "channels", channelId, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs);
    });

    return unsub;
  }, [serverId, channelId]);

  return (
    <div className="bg-[#313338] w-full">
      <FeedHeader name={channelName} />
      <MessageInput serverId={serverId} channelId={channelId} />
      <div className="pb-[100px]">
        {messages.map((message) => (
          <Message
            key={message.id}
            data={message.data()}
            id={message.id}
            serverId={serverId}
            channelId={channelId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

function FeedHeader({ name }) {
  return (
    <header className="h-12 bg-[#313338] border-b-2 border-[#1f2123] sticky top-0  w-full p-2.5">
      <div className="flex justify-between text-[#f2f3f5]">
        <div className="text-[#f2f3f5] flex font-semibold rounded-md space-x-2">
          <HashtagIcon className="w-5" />
          <h1 className="text-base font-bold text-[#f2f3f5]">{name}</h1>
        </div>
      </div>
    </header>
  );
}

export default Feed;
