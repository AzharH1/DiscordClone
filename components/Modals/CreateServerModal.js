import { db } from "@/firebase";
import {
  closeCreateServerModal,
  openCreateServerModal,
  openSignupModal,
} from "@/redux/modalSlice";
import { PlusIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Modal from "@mui/material/Modal";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServerListItem from "../Sidebar/ServerListItem";

function CreateServerModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.createServerModal);
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const [serverName, setServerName] = useState("");

  async function createServer() {
    const docRef = await addDoc(collection(db, "servers"), {
      name: serverName,
      ownerUID: user.uid,
      timestamp: serverTimestamp(),
    });

    await setDoc(doc(db, "servers", docRef.id, "channels", "general"), {
      name: "general",
    });

    dispatch(closeCreateServerModal());
    setServerName("");
  }

  return (
    <div>
      <div
        onClick={() => {
          if (!user.username) {
            dispatch(openSignupModal());
            return;
          }
          dispatch(openCreateServerModal());
        }}
        className="hover:bg-green-600 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center bg-[#313338] text-[#dbdee1] font-bold text-lg hover:rounded-xl"
      >
        <PlusIcon className="w-8" />
      </div>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeCreateServerModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="w-[300px] h-[400px] bg-[#1E1F22] rounded-md p-1">
          <div
            onClick={() => dispatch(closeCreateServerModal())}
            className="cursor-pointer"
          >
            <XCircleIcon className="w-8 text-white" />
          </div>
          <div className="text-[#f2f3f5] p-3">
            <h1 className="text-2xl font-bold mb-4">Create Server</h1>

            <div className="space-y-3">
              <input
                className="w-full px-4 py-1 rounded-lg text-[#f2f3f5] bg-[#383A40] resize-none outline-none"
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Server Name"
              />
              <button
                onClick={createServer}
                className="bg-[#5865f2] w-full px-4 py-1 rounded-lg text-[#f2f3f5] font-bold"
              >
                Create server
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateServerModal;
