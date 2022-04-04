import { getAccessToken, getSession, useUser } from "@auth0/nextjs-auth0"

import { GetServerSideProps} from 'next'

export default function Home() {
  const {user} = useUser()
  return (
   <div>
     <pre>
      {JSON.stringify(user, null, 2)}
     </pre>

     <a href="/api/auth/login">Login</a>
   </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res)

  if(!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false
      }
    }
  }

  return {
    redirect: {
      destination: '/app',
      permanent: false
    }
  }
}
