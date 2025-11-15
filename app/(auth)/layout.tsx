import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex justify-between items-center w-full h-full'>
			{children}
		</div>
	)
}

export default AuthLayout