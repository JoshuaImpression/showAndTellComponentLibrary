import { gsap } from 'gsap';
import { useRef, useEffect, useContext, createRef, LegacyRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { GlobalContext } from '../../pages/_app';
import SplitType, { TargetElement } from 'split-type';

type useAnimation = {
	type: 'byChar' | 'byWord' | 'fadeIn',
	delay?: number | 'pageLoading'
}

export function useAnimation({ type, delay }: useAnimation) {
	const ref = useRef(null)
	const [inViewRef, inView] = useInView({
		triggerOnce: true,
	});
	const { animationDelay } = useContext(GlobalContext)
	const delayVal = (delay == 'pageLoading' && animationDelay) || (!!delay && delay as number) || 0

	const setRefs = useCallback((node) => {
		ref.current = node;

		inViewRef(node);
	}, [inViewRef]);

	useEffect(() => {
		if (!['byChar', 'byWord'].includes(type) || !ref.current || !inView) return

		const splitText = new SplitType(ref.current, {
			types: 'chars, words'
		})

		gsap.set(splitText.words, {
			overflow: 'hidden',
			verticalAlign: 'top'
		})

		if (type == 'byWord') {
			const tl = gsap.timeline({
				delay: delayVal,
				scrollTrigger: !delay && {
					trigger: ref.current,
					scrub: !delay,
					end: 'bottom 70%',
				} || null,
			})

			splitText.words?.length && splitText.words.map((word, idx) => {
				tl.from(word.querySelectorAll('.char'), {
					y: '100%',
					delay: idx*.02,
				}, '')
			})

			return () => {
				tl.kill()
				splitText.revert()
			}
		} else {
			gsap.from(splitText.chars, {
				y: '100%',
				stagger: .02,
				delay: delayVal,
				scrollTrigger: !delay && {
					trigger: ref.current,
					end: 'bottom 60%',
					scrub: !delay
				} || null
			})

			return () => {
				gsap.killTweensOf(splitText.chars)
				splitText.revert()
			}
		}
	}, [inView])

	useEffect(() => {
		if (type != 'fadeIn' || !ref.current || !inView) return

		gsap.from(ref.current, {
			opacity: 0,
			delay: delayVal,
			scrollTrigger: !delay && {
				trigger: ref.current,
				end: 'bottom 50%',
				scrub: !delay
			} || null
		})

		return () => {
			gsap.killTweensOf(ref.current)
		}
	}, [inView])

	return setRefs
}