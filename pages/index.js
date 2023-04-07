
import Sidebar from '@/components/Sidebar/Sidebar'
import Feed from '@/components/Feed'

export default function Home() {
  return (
    <>
      <main className='min-h-screen flex'>
        <Sidebar serverId={"home"} />
        <Feed serverId={"home"} />
      </main>
    </>
  )
}
