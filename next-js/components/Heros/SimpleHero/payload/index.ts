import { SingleBlock } from "@/payload-types";

export const SimpleHero: SingleBlock = {
	slug: 'simple-hero',
	name: 'simpleHero',
	label: 'Simple Hero',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'titleSize',
			type: 'select',
			options: ['Default', 'Small'],
			defaultValue: 'Default'
		},
		{
			name: 'ticker_text',
			type: 'checkbox',
			label: 'Ticker Text',
			defaultValue: false,
		},
		{
			name: 'description',
			type: 'textarea',
		},
	],
}