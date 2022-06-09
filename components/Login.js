import React from 'react'
import { useRouter } from 'next/router'

const Login = () => {
    const router = useRouter();
  return (
    <div className='ml-[240px] mt-10' onClick={()=> router.push('/login')}>
        <button>GO TO LOGIN PAGE</button>
    </div>
  )
}

export default Login