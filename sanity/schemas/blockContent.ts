import { defineType } from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      type: 'heroBlock'
    },
    {
      type: 'textBlock'
    },
    {
      type: 'featureGridBlock'
    },
    {
      type: 'teamGridBlock'
    },
    {
      type: 'imageGalleryBlock'
    }
  ]
})
