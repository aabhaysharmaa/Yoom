import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
	return (
		<main className='flex justify-between items-center w-full h-full'>
			<SignUp />
		</main>
	)
}

export default SignUpPage