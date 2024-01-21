import { FC } from 'react'
import Head from 'next/head';

interface SchemaBlockProps {
  schema: any
}

const SchemaBlock: FC<SchemaBlockProps> = ({ schema }) => {
  return (
    <Head>
        <script
            key="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    </Head>
  )
}

export default SchemaBlock