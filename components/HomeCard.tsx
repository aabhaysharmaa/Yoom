import { cn } from '@/lib/utils';
import Image from 'next/image'


interface HomeCardTypes {
	imgURL: string,
	title: string,
	text: string,
	handelClick?: () => void,
	color?: string
}


const HomeCard = ({ imgURL, title, text, handelClick, color }: HomeCardTypes) => {
	return (
		<div className={cn(" px-4 py-6 flex flex-col justify-between xl:max-w-[270px]  min-h-[260px] rounded-[14px] cursor-pointer", color)} onClick={handelClick}>
			<div className="flex justify-center items-center glassmorphism size-12 rounded-[10px] ">
				<Image src={imgURL} alt="meeting" width={27} height={27} />
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">{title}</h1>
				<p className="font-normal text-lg">{text}</p>
			</div>
		</div>
	)
}

export default HomeCard;