import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog',
      path: 'src/content/blog/*',
      slugField: 'title',
      format: { data: 'yaml', contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul' } }),
        description: fields.text({ label: 'Deskripsi', multiline: true, defaultValue: '' }),
        pubDate: fields.date({ label: 'Tanggal Publikasi' }),
        updatedDate: fields.date({ label: 'Tanggal Update' }),
        postType: fields.select({
          label: 'Tipe Post',
          options: [
            { label: 'Long', value: 'long' },
            { label: 'Quote', value: 'quote' },
            { label: 'Image', value: 'image' },
            { label: 'Link', value: 'link' },
            { label: 'Short', value: 'short' },
          ],
          defaultValue: 'long',
        }),
        category: fields.select({
          label: 'Kategori',
          options: [
            { label: 'Craft', value: 'craft' },
            { label: 'Notes', value: 'notes' },
            { label: 'Family', value: 'family' },
          ],
          defaultValue: 'notes',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        quoteAttribution: fields.text({ label: 'Atribusi Kutipan' }),
        quoteSource: fields.text({ label: 'Sumber Kutipan' }),
        image: fields.text({ label: 'URL Gambar' }),
        imageAlt: fields.text({ label: 'Alt Gambar' }),
        imageCaption: fields.text({ label: 'Caption Gambar', multiline: true }),
        linkUrl: fields.url({ label: 'URL Link' }),
        linkDomain: fields.text({ label: 'Domain Link' }),
        cover: fields.image({
          label: 'Cover',
          directory: 'public/images/blog',
          publicPath: '/images/blog',
        }),
        coverAlt: fields.text({ label: 'Alt Cover' }),
        images: fields.array(
          fields.image({
            label: 'Gambar',
            directory: 'public/images/blog',
            publicPath: '/images/blog',
          }),
          {
            label: 'Gambar Tambahan',
            itemLabel: (props) => props.fields.image || 'Gambar',
          }
        ),

        content: fields.mdx({
          label: 'Konten',
          options: {
            bold: true,
            italic: true,
            strikethrough: true,
            code: true,
            heading: true,
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            link: true,
            divider: true,
          },
        }),
      },
    }),
    work: collection({
      label: 'Work / Portfolio',
      path: 'src/content/work/*',
      slugField: 'title',
      format: { data: 'yaml', contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul' } }),
        description: fields.text({ label: 'Deskripsi', multiline: true, defaultValue: '' }),
        cover: fields.text({ label: 'URL Cover' }),
        coverAlt: fields.text({ label: 'Alt Cover' }),
        type: fields.select({
          label: 'Tipe',
          options: [
            { label: 'Illustration', value: 'illustration' },
            { label: 'Commission', value: 'commission' },
            { label: 'Generative', value: 'generative' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'illustration',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        year: fields.integer({ label: 'Tahun' }),
        tools: fields.array(fields.text({ label: 'Tool' }), {
          label: 'Tools',
          itemLabel: (props) => props.value || 'Tool',
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        order: fields.integer({ label: 'Urutan', defaultValue: 99 }),
        externalUrl: fields.url({ label: 'URL Eksternal' }),

        content: fields.mdx({
          label: 'Konten',
          options: {
            bold: true,
            italic: true,
            strikethrough: true,
            code: true,
            heading: true,
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            link: true,
            divider: true,
          },
        }),
      },
    }),
  },
  singletons: {
    now: singleton({
      label: 'Now Page',
      path: 'src/content/now',
      // Ubah format ke mdx
      format: { data: 'yaml', contentField: 'content' },
      schema: {
        lastUpdated: fields.date({ label: 'Terakhir Diupdate' }),
        projects: fields.array(
          fields.object({
            title: fields.text({ label: 'Judul Proyek' }),
            desc: fields.text({ label: 'Deskripsi', multiline: true }),
            status: fields.select({
              label: 'Status',
              options: [
                { label: 'Aktif', value: 'aktif' },
                { label: 'Pelan-pelan', value: 'pelan-pelan' },
              ],
              defaultValue: 'aktif',
            }),
          }),
          {
            label: 'Proyek',
            itemLabel: (props) => props.fields.title || 'Proyek',
          }
        ),
        focus: fields.array(
          fields.object({
            area: fields.text({ label: 'Area Fokus' }),
            desc: fields.text({ label: 'Deskripsi', multiline: true }),
          }),
          {
            label: 'Fokus',
            itemLabel: (props) => props.fields.area || 'Fokus',
          }
        ),

        // Ganti fields.markdoc menjadi fields.document
        content: fields.mdx({
          label: 'Konten',
          options: {
            bold: true,
            italic: true,
            strikethrough: true,
            code: true,
            heading: true,
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            link: true,
            divider: true,
          },
        }),
      },
    }),
  },
});