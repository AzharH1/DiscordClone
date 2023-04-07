import { useRouter } from "next/router";
import { useState } from "react";

function ServerListItem({ label, active, data, id }) {
  const router = useRouter();
  const serverId = router.query.id;

  const [hovering, setHovering] = useState(false);

  function ToolTip({ label }) {
    return (
      <div
        className={`${
          !hovering && "hidden"
        } absolute z-50 flex justify-start items-center left-12 w-fit px-2 ml-2  bg-black rounded-md`}
      >
        <span className="text-[15px]">{label}</span>
      </div>
    );
  }

  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      onClick={() => router.push("/" + id + "/general")}
      className={`
    ${serverId === id && "rounded-xl bg-blue-600"}
    relative  
    w-12 h-12 cursor-pointer rounded-full flex justify-center items-center bg-[#313338] text-[#dbdee1] font-bold text-xl hover:rounded-xl mb-2`}
    >
      <ToolTip label={data.name} />
      {label}
    </div>
  );
}

export default ServerListItem;
