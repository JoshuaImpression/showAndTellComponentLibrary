import cssWorkCarousel from '@/blocks/WorkCarousel/index.module.css';
import { Arrow, Arrow2 } from '@/components/Icons';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './index.module.css';

import Wrapper from '@/components/Wrapper';
import leadZero from '@/hooks/leadZero';
import toTitle from '@/hooks/toTitle';
import { useAnimation } from '@/hooks/useAnimation';
import { gsap } from 'gsap';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Navigation } from 'swiper';
import 'swiper/css';

export default function CardsCarousel({ title, pages }) {
	const ref = useRef<HTMLElement>()
	const prevRef = useRef<HTMLButtonElement>(null)
	const nextRef = useRef<HTMLButtonElement>(null)
	const transitionRef = useRef(0)
	const [slideInteraction, setSlideInteraction] = useState(0)
	const titleRef = useAnimation({
		type: 'byChar'
	})
	const [inViewRef, inView] = useInView({
		triggerOnce: true,
	});
	const setRefs = useCallback((node) => {
		ref.current = node;

		inViewRef(node);
	}, [inViewRef]);
	const customEffect = (swiper) => {
		const scaleClamp = gsap.utils.clamp(0, 1)
		const opacityClamp = gsap.utils.clamp(0, 1)

		swiper.slides.map((el, idx) => {

			var left = swiper.slidesGrid[idx],
				x = -swiper.translate - left,
				k = 1 - x / el.offsetWidth,
				o = opacityClamp(k * .5 + .5),
				scale = scaleClamp(k * 0.2 + 0.8);

			x = x <= 0 ? 0 : x;

			gsap.set(el, {
				x,
				scale,
				opacity: o,
				transitionDuration: transitionRef.current,
			})

			gsap.set(el, {
				transitionDuration: 0,
				delay: transitionRef.current
			})
		})
	}
	const onSetTransition = (swiper, transitionSpeed) => {
		transitionRef.current = transitionSpeed / 1000
	}
	const onSlideChange = () => {
		setSlideInteraction(prev => prev + 1)
	}

	if (!pages.length) return <></>

	return (
		<section className={css.block}>
			<Wrapper className={css.wrapper}>
				<h2 ref={titleRef} className={`${css.title} ${cssWorkCarousel.title}`}>
					<span>{toTitle(title)}</span>
				</h2>
				<div className={css.arrows}>
					<button
						ref={prevRef}
						className={css.arrowPrev}
					>
						<Arrow2 />
					</button>
					<button
						ref={nextRef}
						className={css.arrowNext}
					>
						<Arrow2 />
					</button>
				</div>
				<div ref={setRefs}>
					<Swiper
						modules={[Navigation]}
						effect='slide'
						spaceBetween={20}
						navigation={{
							nextEl: nextRef.current,
							prevEl: prevRef.current
						}}
						loop
						loopedSlides={4}
						className={css.swiper}
						slidesPerView='auto'
						breakpoints={{
							546: {
								spaceBetween: 30
							}
						}}
						watchSlidesProgress={true}
						touchStartPreventDefault={false}
						onSetTranslate={customEffect}
						onSetTransition={onSetTransition}
						onSlideChange={onSlideChange}
					>
						{pages.map((el) => {

							return (
								<SwiperSlide
									key={el.id}
									className={css.slideItem}
								>
									<div className={css.content}>
										<div className={css.subTitle}>{el.subtitle || 'Sectors'}</div>
										<h6 className={css.title}>
											{el.title}
										</h6>
										<div className={css.button}>
											<span>Discover more</span>
											<Arrow />
										</div>
									</div>
									<picture>
										<Image
											src={el.featuredImage.url}
											alt={el.featuredImage.alt}
											width={el.featuredImage.width}
											height={el.featuredImage.height}
											sizes='true'
										/>
									</picture>
								</SwiperSlide>
							)
						})}
					</Swiper>
				</div>
			</Wrapper>
		</section>
	)
}