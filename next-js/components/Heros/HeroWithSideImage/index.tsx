import css from './index.module.css';
import { useRef } from 'react';
import { UploadField } from '@/payload-types';
import Image from 'next/image';
import Button from '@/components/Button';

type HeroWithSideImage = {
	title: string,
	descriptionCol1?: string,
	descriptionCol2?: string,
	link?: {
		url: string,
		label: string
	} 
	image: UploadField,
	video?: UploadField,
}

export default function HeroWithSideImage({ title, descriptionCol1, descriptionCol2, image, link, video }: HeroWithSideImage) {
	const ref = useRef<HTMLElement>(null)
	const descRef = useRef<HTMLParagraphElement>(null)


	return (
		<section ref={ref} className={css.block}>
			<div className={css.contentCol}>
				<h1>Some content</h1>
				{(descriptionCol1 || descriptionCol2) && (
					<div ref={descRef} className={css.sub}>
						<div>
							{descriptionCol1 && (
								<p>{descriptionCol1}</p>
							)}
							{descriptionCol2 && (
								<p>{descriptionCol2}</p>
							)}
						</div>
					</div>
				)}
				{link && (link.url && link.label) && (
					<div className={css.buttonBlock}>
						<Button href={link.url} label={link.label} />
					</div>
				)}
			</div>
			<picture>
				<Image
					src={image.url}
					alt={image.alt}
					width={image.width}
					height={image.height}
					sizes='true'
					priority
				/>
			</picture>
		</section>
	)
}