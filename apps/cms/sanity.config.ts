import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {codeInput} from '@sanity/code-input'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'

export default defineConfig({
  name: 'default',
  title: 'maxwiseman.io',

  projectId: 'owrmsj13',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), codeInput(), unsplashImageAsset()],

  schema: {
    types: schemaTypes,
  },
})
