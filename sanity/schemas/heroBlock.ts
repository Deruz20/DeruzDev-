import { defineType } from 'sanity'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
        { name: 'fr', title: 'French', type: 'string' },
        { name: 'lg', title: 'Luganda', type: 'string' }
      ]
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ar', title: 'Arabic', type: 'text' },
        { name: 'fr', title: 'French', type: 'text' },
        { name: 'lg', title: 'Luganda', type: 'text' }
      ]
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'ar', title: 'Arabic', type: 'string' },
                { name: 'fr', title: 'French', type: 'string' },
                { name: 'lg', title: 'Luganda', type: 'string' }
              ]
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string'
            },
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
})
