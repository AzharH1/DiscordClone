import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateServerModal from "../Modals/CreateServerModal";
import ServerListItem from "./ServerListItem";

function ServerList() {
  const router = useRouter();
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "servers"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setServers(snapshot.docs);
    });

    return unsub;
  }, [router.pathname]);

  return (
    <div className=" bg-[#1E1F22] w-[72px] h-full flex flex-col  items-center">
      <nav className="py-4 fixed top-0">
        <ul className=" space-y-4 mb-4">
          {servers.map((server) => (
            <Link  href={"/" + server.id + "/general"}>
              <ServerListItem
                key={server.id}
                label={server.data().name[0]}
                id={server.id}
                data={server.data()}
              />
            </Link>
          ))}
        </ul>

        <CreateServerModal />
      </nav>
    </div>
  );
}

export default ServerList;
