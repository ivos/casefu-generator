import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { SkeletonForm } from '../form'
import { DetailForm } from '.'

export default ({ title, entityTitle, rows, useResourceGet, buttons, children }) => {
  const { id } = useParams()

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
          <DetailForm id={id}
                      useResourceGet={useResourceGet}
                      buttons={buttons}>
            {children}
          </DetailForm>
        </Suspense>
      </Card.Body>
    </Card>
  </>
}
