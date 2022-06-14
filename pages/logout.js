import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from 'next/router';

const Logout = () => {
  const [cookie, setCookie, removeCookie] = useCookies()
  const router = useRouter()
  useEffect(() => {
    if (!cookie.user)
      router.push('/')
    removeCookie('user')
    removeCookie('username')
    router.push('/')
  }, [])
  return (
    <>
      Logging Out User...
    </>
  )
}

export default Logout