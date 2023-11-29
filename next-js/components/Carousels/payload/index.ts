import { ArrayField, Block } from "payload/types";

export const CardsCarousel: Block = {
	slug: 'cards-carousel',
	fields: [
		{
			name: 'title',
			type: 'text'
		},
		{
			name: 'pages',
			type: 'array',
			fields: [
				{
					name: 'subtitle',
					type: 'text',
					required: true,
				},
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'featuredImage',
					type: 'upload',
					relationTo: 'media',
					required: true,
					filterOptions: {
						mimeType: { contains: "image" },
					},
				},
				{
					name: 'page',
					type: 'relationship',
					relationTo: ['pages', 'services'],
					required: true,
				},
			],
			admin: {
				initCollapsed: true,
				components: {
					RowLabel: ({ data, index }) => {
						return data?.title || null;
					},
				},
			},
		} as ArrayField,
	],
}