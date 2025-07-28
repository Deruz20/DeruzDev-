import { defineType } from 'sanity'

export default defineType({
  name: 'imageGalleryBlock',
  title: 'Image Gallery Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
        { name: 'fr', title: 'French', type: 'string' },
        { name: 'lg', title: 'Luganda', type: 'string' }
      ]
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'ar', title: 'Arabic', type: 'string' },
                { name: 'fr', title: 'French', type: 'string' },
                { name: 'lg', title: 'Luganda', type: 'string' }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'layout',
      title: 'Gallery Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Carousel', value: 'carousel' }
        ]
      },
      initialValue: 'grid'
    }
  ]
})
