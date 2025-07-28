import { defineType } from 'sanity'

export default defineType({
  name: 'featureGridBlock',
  title: 'Feature Grid Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
        { name: 'fr', title: 'French', type: 'string' },
        { name: 'lg', title: 'Luganda', type: 'string' }
      ]
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'ar', title: 'Arabic', type: 'string' },
                { name: 'fr', title: 'French', type: 'string' },
                { name: 'lg', title: 'Luganda', type: 'string' }
              ]
            },
            {
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'text' },
                { name: 'ar', title: 'Arabic', type: 'text' },
                { name: 'fr', title: 'French', type: 'text' },
                { name: 'lg', title: 'Luganda', type: 'text' }
              ]
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string'
            },
            {
              name: 'image',
              title: 'Feature Image',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ]
    }
  ]
})
