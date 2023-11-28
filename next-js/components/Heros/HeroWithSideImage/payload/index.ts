import { Block } from "payload/types";

export const HeroWithSideImage: Block = {
	slug: 'hero-with-side-image',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'descriptionCol1',
			type: 'textarea',
		},
		{
			name: 'descriptionCol2',
			type: 'textarea',
		},
		{
			name: 'link',
			type: 'group',
			fields: [
				{
					name: 'url',
					type: 'text',
				},
				{
					name: 'label',
					type: 'text',
				}
			]
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			required: true,
			filterOptions: {
				mimeType: { contains: "image" },
			},
		},
		{
			name: 'video',
			type: 'upload',
			relationTo: 'media',
			filterOptions: {
				mimeType: { contains: "video" },
			},
		},
	],
}