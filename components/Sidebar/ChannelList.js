import { PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { HashtagIcon, TrashIcon } from "@heroicons/react/24/outline";
import LoginModal from "../Modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { signoutUser } from "@/redux/userSlice";
import { signOut } from "firebase/auth";
import SignupModal from "../Modals/SignupModal";
import { openSignupModal } from "@/redux/modalSlice";

function ChannelList({ serverId }) {
  const user = useSelector((state) => state.user);
  const [channels, setChannels] = useState([]);
  const [serverName, setServerName] = useState("");

  function ChannelListHeader({ name, serverId }) {
    return (
      <header className="h-12 bg-transparent border-b-2 border-[#1f2123] sticky top-0 p-2.5">
        <div className="flex justify-between text-[#f2f3f5]">
          <h1 className="text-base font-bold text-[#f2f3f5]">{name}</h1>
          <div className="flex space-x-2">
            <CreateChannelModal serverId={serverId} />
          </div>
        </div>
      </header>
    );
  }

  function CreateChannelModal({ serverId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [channelName, setChannelName] = useState("");

    const dispatch = useDispatch();

    async function createChannel() {
      await addDoc(collection(db, "servers", serverId, "channels"), {
        name: channelName,
      });
    }

    return (
      <div>
        <PlusIcon
          onClick={() => {
            if (!user.username) {
              dispatch(openSignupModal());
              return;
            }
            setIsOpen(true);
          }}
          className="w-5 cursor-pointer"
        />

        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
          <div className="w-[300px] h-[400px] bg-[#1E1F22] rounded-md p-1">
            <div onClick={() => setIsOpen(false)} className="cursor-pointer">
              <XCircleIcon className="w-8 text-white" />
            </div>
            <div className="text-[#f2f3f5] p-3">
              <h1 className="text-2xl font-bold mb-4">Create channel</h1>

              <div className="space-y-3">
                <input
                  className="w-full px-4 py-1 rounded-lg text-[#f2f3f5] bg-[#383A40] resize-none outline-none"
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="Channel Name"
                />
                <button
                  onClick={createChannel}
                  className="bg-[#5865f2] w-full px-4 py-1 rounded-lg text-[#f2f3f5] font-bold"
                >
                  Create channel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  useEffect(() => {
    if (!serverId) return;
    const q = query(collection(db, "servers", serverId, "channels"));
    const unsub = onSnapshot(q, (snapshot) => {
      setChannels(snapshot.docs);
    });

    return unsub;
  }, [serverId]);

  useEffect(() => {
    if (!serverId) return;

    async function getServerName() {
      const docRef = await getDoc(doc(db, "servers", serverId));
      const name = docRef.data()?.name;
      setServerName(name);
    }

    getServerName();
  }, [serverId]);

  return (
    <div className="bg-[#2B2D31] w-[240px] h-full">
      <ChannelListHeader name={serverName} serverId={serverId} />
      <nav className="">
        <ul className="w-[240px] pt-2 px-2 space-y-1 fixed top-12">
          {channels.map((channel) => (
            <Link href={"/" + serverId + "/" + channel.id} key={channel.id}>
              <ChannelListItem id={channel.id} name={channel.data().name} />
            </Link>
          ))}
        </ul>
      </nav>

      <div className="fixed h-12 bottom-0 p-2.5 border-t-2 w-full border-[#1f2123]">
        {!user.username ? (
          <div className="flex space-x-5">
            <LoginModal />
            <SignupModal />
          </div>
        ) : (
          <UserProfile user={user} />
        )}
      </div>
    </div>
  );
}

function UserProfile({ user }) {
  const dispatch = useDispatch();

  async function handleSignout() {
    await signOut(auth);
    dispatch(signoutUser());
  }
  return (
    <div className="flex space-x-2">
      <img className="w-8 h-8 object-cover rounded-full" src={user.photoUrl} />
      <div className="flex justify-between space-x-16 pr-4">
        <div className="">
          <h3 className="text-[#f2f3f5] font-bold">{user.username}</h3>
        </div>

        <button
          onClick={handleSignout}
          className="bg-red-500 px-2 rounded-lg text-[#f2f3f5] font-bold text-sm"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

function ChannelListItem({ name, id }) {
  const router = useRouter()
  const channelId = router.query.channelId
  return (
    <li className={`
    ${channelId === id && "bg-white bg-opacity-10"}
    text-[#f2f3f5] flex font-semibold rounded-md mt-1 space-x-2 hover:bg-white hover:bg-opacity-5 p-1 cursor-pointer`}>
      <HashtagIcon className="w-5" />
      <div>
        <h3 className="text-[16px]">{name}</h3>
      </div>
    </li>
  );
}

export default ChannelList;
