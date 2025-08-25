import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // Control what's populated by default when a project is referenced
  defaultPopulate: {
    title: true,
    slug: true,
    category: true,
    projectDuration: {
      startDate: true,
      endDate: true,
      inProgress: true,
    },
    featured: true,
    coverImage: true,
  },
  admin: {
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'shortDescription',
              label: 'Short Description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              required: true,
              admin: {
                description: 'A brief description of the project (1-2 paragraphs)',
              },
            },
            {
              name: 'coverImage',
              label: 'Cover Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main project image displayed in portfolio grid',
              },
            },
            {
              name: 'gallery',
              label: 'Project Gallery',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  admin: {
                    placeholder: 'Optional image caption...',
                  },
                },
              ],
              admin: {
                description: 'Additional project images displayed in project detail page',
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              name: 'category',
              type: 'select',
              options: [
                {
                  label: 'Residential',
                  value: 'residential',
                },
                {
                  label: 'Commercial',
                  value: 'commercial',
                },
                {
                  label: 'Interior Design',
                  value: 'interior-design',
                },
                {
                  label: 'Urban Planning',
                  value: 'urban-planning',
                },
                {
                  label: 'Renovation',
                  value: 'renovation',
                },
                {
                  label: 'Landscape Architecture',
                  value: 'landscape-architecture',
                },
                {
                  label: 'Conceptual Design',
                  value: 'conceptual-design',
                },
                {
                  label: 'Other',
                  value: 'other',
                },
              ],
              required: true,
              admin: {
                position: 'sidebar',
                description: 'Project category for filtering and organization',
              },
            },
            {
              name: 'projectDuration',
              label: 'Project Timeline',
              type: 'group',
              fields: [
                {
                  name: 'startDate',
                  label: 'Start Date',
                  type: 'date',
                  required: true,
                  admin: {
                    description: 'When the project began',
                    date: {
                      pickerAppearance: 'monthOnly',
                    },
                  },
                },
                {
                  name: 'inProgress',
                  label: 'Project In Progress',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Check if project is still ongoing',
                  },
                },
                {
                  name: 'endDate',
                  label: 'End Date',
                  type: 'date',
                  admin: {
                    description: 'When the project was completed (leave empty if in progress)',
                    condition: (_, siblingData) => !siblingData?.inProgress,
                    date: {
                      pickerAppearance: 'monthOnly',
                    },
                  },
                },
              ],
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'tags',
              label: 'Project Tags',
              type: 'array',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g., React, TypeScript, Design System',
                  },
                },
              ],
              admin: {
                position: 'sidebar',
                initCollapsed: true,
                description: 'Technologies, skills, or keywords associated with this project',
              },
            },
            {
              name: 'featured',
              label: 'Featured Project',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                position: 'sidebar',
                description: 'Display this project prominently on the homepage',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When this project should be published and visible to visitors',
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.publishedAt) {
          data.publishedAt = new Date()
        }
        return data
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal user experience
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}