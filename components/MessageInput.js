import { db } from "@/firebase";
import { openSignupModal } from "@/redux/modalSlice";
import {
  FaceSmileIcon,
  GifIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MessageInput({ serverId, channelId }) {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function sendMessage() {
    if (!user.username) {
      dispatch(openSignupModal());
      return;
    }

    await addDoc(
      collection(db, "servers", serverId, "channels", channelId, "messages"),
      {
        uid: user.uid,
        username: user.username,
        photoUrl: user.photoUrl,
        message: message,
        timestamp: serverTimestamp(),
      }
    );

    setMessage("");
  }

  return (
    <div className="fixed bottom-0 w-full pb-5 flex justify-center  p-3 bg-[#313338]">
      <div className="flex w-full sm:w-[70%] rounded-lg sm:-ml-[312px] justify-center bg-[#383A40]">
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.value = "";
              sendMessage();
            }
          }}
          className="h-12 p-3 text-[#f2f3f5] rounded-md  w-full bg-[#383A40] resize-none outline-none"
          placeholder="Message"
        ></textarea>

        <PaperAirplaneIcon
          onClick={sendMessage}
          className="w-7 -rotate-45 mr-5 text-gray-500"
        />
      </div>
    </div>
  );
}

export default MessageInput;
