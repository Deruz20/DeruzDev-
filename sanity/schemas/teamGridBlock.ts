import { defineType } from 'sanity'

export default defineType({
  name: 'teamGridBlock',
  title: 'Team Grid Block',
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
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'teamMember' }]
        }
      ]
    }
  ]
})
