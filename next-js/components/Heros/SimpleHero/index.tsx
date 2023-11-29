import css from './index.module.css';

import { Ticker } from "@/components/Ticker"
import * as Icon from '@/components/Icons';
import { useContext, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { GlobalContext } from '../../../pages/_app';
import toBr from '@/hooks/toBr';
import { useAnimation } from '@/hooks/useAnimation';

type SimpleHero = {
	title: string,
	ticker_text: boolean,
	description: string,
	titleSize?: string
}

export default function SimpleHero({ title, ticker_text = false, description, titleSize }: SimpleHero) {
	const blockCSS = [css.block]
	const ref = useRef<HTMLElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)


	return (
		<section ref={ref} className={css.block)}>
			<h1 ref={titleRef}>{title}</h1>
			{description && (
				<div ref={descriptionRef} className={css.description}>
					<p ref={descRef}>{description}</p>
				</div>
			)}
		</section>
	)
}