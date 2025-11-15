
import { SignIn } from '@clerk/nextjs';

import React from 'react';

const SignInPage = () => {
	return (
		<main className='flex justify-between items-center w-full h-full'>
			<SignIn />
		</main>
	)
}

export default SignInPage