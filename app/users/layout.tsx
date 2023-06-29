import getUsers from '../actions/getUsers'
import Sidebar from '../components/sidebar/Sidebar'
import UserList from './components/UserList'

// Define the UsersLayout component
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsers()

  // Return the Sidebar component with the UserList component as a child
  // and the children prop passed through
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  )
}
