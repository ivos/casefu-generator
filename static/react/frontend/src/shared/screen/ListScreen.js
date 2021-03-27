import React, { Suspense, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card, Table } from 'react-bootstrap'
import { useMount } from 'react-use'
import { SearchForm, SkeletonForm, SkeletonTableRows, TablePage } from '..'
import { emptyValuesToNulls, identity, toUrlParams, usePaging, useUrlParams } from '../utils'

export default (
  {
    searchValuesCache, setSearchValuesCache,
    title, url, useResourceList, toApi = identity, fromApi = identity,
    searchFormRows, searchFormContent,
    columns, tableHeader, tablePageContent
  }) => {
  const [searchValues, setSearchValues] = useState(searchValuesCache || {})
  const { pagesCount, isLastPage, loadNextPage, setLastPage, resetPages } = usePaging()
  const history = useHistory()
  const urlParams = useUrlParams()

  const setSearchValuesFull = values => {
    setSearchValuesCache && setSearchValuesCache(values)
    setSearchValues(values)
  }

  useMount(() => {
    setSearchValuesFull({ ...searchValues, ...fromApi(urlParams) })
  })

  useEffect(() => {
    history.replace(`${url}?${toUrlParams(toApi(searchValues))}`)
  }, [history, url, searchValues, toApi])

  return <>
    <h2>
      {title}
    </h2>
    <Suspense fallback={
      <Card className="mb-3">
        <Card.Body>
          <SkeletonForm rows={searchFormRows}/>
        </Card.Body>
      </Card>
    }>
      <Card className="mb-3">
        <Card.Body>
          <SearchForm searchValues={searchValues}
                      setSearchValues={setSearchValuesFull}
                      resetPages={resetPages}>
            {searchFormContent}
          </SearchForm>
        </Card.Body>
      </Card>

      <Table bordered hover>
        <thead>
          <tr>
            {tableHeader}
          </tr>
        </thead>
        <tbody>
          {
            [...Array(pagesCount)]
              .map((_, index) =>
                <Suspense fallback={<SkeletonTableRows columns={columns}/>}
                          key={`page-${index}`}>
                  <TablePage searchValues={emptyValuesToNulls(toApi(searchValues))}
                             $page={index}
                             setLastPage={setLastPage}
                             url={url}
                             useResourceList={useResourceList}
                             children={tablePageContent}/>
                </Suspense>
              )
          }
        </tbody>
      </Table>

      <Button variant="outline-secondary"
              disabled={isLastPage}
              onClick={loadNextPage}>
        Load next&hellip;
      </Button>
    </Suspense>
  </>
}
