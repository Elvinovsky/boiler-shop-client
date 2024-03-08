import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { checkUserAuthFx } from '@/app/api/auth'
import { setUser } from '@/context/user'

const useRedirectByUserCheck = (isAuthPage = false) => {
  const [shouldLoadContent, setShouldLoadContent] = useState(false)
  const router = useRouter()
  const shouldCheckAuth = useRef(true)

  useEffect(() => {
    const checkUser = async () => {
      const user = await checkUserAuthFx('/users/login-check')

      if (isAuthPage) {
        if (!user) {
          setShouldLoadContent(true)
          return
        }
        await router.push('/dashboard')
        return
      }

      if (user) {
        setUser(user)
        setShouldLoadContent(true)
        return
      }

      await router.push('/')
    }

    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false
      checkUser()
    }
  }, [isAuthPage, router])

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
