import React from 'react'
import { CircularProgress } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { LinksList } from '../components/LinksList'

export const LinksPage = () => {
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
  const { enqueueSnackbar } = useSnackbar()
  const { token } = React.useContext(AuthContext)
  const { request, loading } = useHttp()
  const [links, setLinks] = React.useState([])

  const removeHandler = async (linkId) => {
    try {
      const data = await request(`/api/link/${linkId}/remove`, 'POST', { linkId }, {
        Authorization: `Bearer ${token}`
      })

      enqueueSnackbar(data.message, { variant: 'success' })
      fetchLinks()
      forceUpdate()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  const fetchLinks = React.useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) { }
  }, [token, request, forceUpdate])

  React.useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <>
      {!loading && <LinksList links={links} removeHandler={removeHandler} />}
    </>
  )
}
