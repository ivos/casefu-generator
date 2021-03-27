import React, { Suspense } from 'react'
import { Card } from 'react-bootstrap'
import { SkeletonForm } from '../form'
import { CreateForm } from '.'
import { useUrlParams } from '../utils'

export default ({ title, entityTitle, url, rows, fromApi, initialValues, validationSchema, create, children }) => {
  const urlParams = useUrlParams()
  initialValues = { ...initialValues, ...fromApi(urlParams) }
  return <>
    <h2>
      {title}
    </h2>
    <Card>
      <Card.Body>
        <Card.Title>
          {entityTitle}
        </Card.Title>

        <Suspense fallback={<SkeletonForm rows={rows}/>}>
          <CreateForm url={url}
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      create={create}>
            {children}
          </CreateForm>
        </Suspense>
      </Card.Body>
    </Card>
  </>
}
