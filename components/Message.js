import { db } from "@/firebase";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";

function Message({ data, id, serverId, channelId }) {
  const [editInput, setEditInput] = useState(false);
  const [edittedMessage, setEdittedMessage] = useState("");

  const user = useSelector((state) => state.user);

  async function editMessage() {
    const docRef = doc(
      db,
      "servers",
      serverId,
      "channels",
      channelId,
      "messages",
      id
    );
    await updateDoc(docRef, {
      message: edittedMessage,
      editted: true,
    });
    setEditInput(false);
    setEdittedMessage("");
  }

  async function deleteMessage() {
    const docRef = doc(
      db,
      "servers",
      serverId,
      "channels",
      channelId,
      "messages",
      id
    );

    await deleteDoc(docRef);
  }

  return (
    <div className="flex p-4 text-[#f2f3f5] space-x-4">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={data?.photoUrl}
      />

      <div>
        <div className="flex space-x-8 items-center">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold">{data?.username}</h3>
            <span className="text-[#919AA4] text-[12px]">
              <Moment format="DD/MM/YYYY hh:mm A">{data?.timestamp?.toDate()}</Moment>
              </span>
            {data?.editted && (
              <span className="text-[#919AA4] text-sm">
                {"(edited)"}
              </span>
            )}
          </div>

          {user.uid === data?.uid && (
            <div className="ml-8 flex space-x-2 text-gray-500">
              <PencilSquareIcon
                onClick={() => setEditInput(true)}
                className="w-5 cursor-pointer hover:text-green-600"
              />
              <TrashIcon
                onClick={deleteMessage}
                className="w-5 cursor-pointer hover:text-red-500"
              />
            </div>
          )}
        </div>
        <p className="text-base">{data?.message}</p>

        {editInput && (
          <div className="mt-2 min-w-[250px]">
            <textarea
              placeholder="Edit your message"
              className="h-12 p-3 text-[#f2f3f5] rounded-md  w-full bg-[#383A40] resize-none outline-none"
              onChange={(e) => setEdittedMessage(e.target.value)}
            />
            <div className="flex space-x-3 mt-1">
              <button
                onClick={editMessage}
                className="bg-[#5865f2] px-2 py-1 rounded-lg text-[#f2f3f5] font-bold"
              >
                Submit
              </button>
              <button onClick={() => setEditInput(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
