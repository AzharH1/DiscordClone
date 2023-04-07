import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useRouter } from "next/router";

function ServerPage() {
  const router = useRouter();
  const serverId = router.query.id;

  return (
    <main className="flex min-h-screen">
      <Sidebar serverId={serverId} />
      <Feed serverId={serverId} />
    </main>
  );
}

export default ServerPage;
