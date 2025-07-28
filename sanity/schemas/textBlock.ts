import { defineType } from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
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
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ar', title: 'Arabic', type: 'text' },
        { name: 'fr', title: 'French', type: 'text' },
        { name: 'lg', title: 'Luganda', type: 'text' }
      ]
    },
    {
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' }
        ]
      },
      initialValue: 'left'
    }
  ]
})
