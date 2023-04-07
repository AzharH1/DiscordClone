import React from 'react'
import ChannelList from './ChannelList'
import ServerList from './ServerList'


function Sidebar({serverId}) {

  return (
    <div className='w-[312px] bg-[#1E1F22]  sm:flex hidden'>
      
      <ServerList serverId={serverId} />
      <ChannelList serverId={serverId} />
        
    </div>
  )
}

export default Sidebar