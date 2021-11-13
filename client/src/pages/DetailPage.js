import * as React from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress } from '@mui/material'
import { useHttp } from '../hooks/http.hook';
import { LinkCard } from '../components/LinkCard'
import { useSnackbar } from 'notistack'

export const DetailPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()
  const { token } = React.useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = React.useState(null)
  const [editable, setEditable] = React.useState(false)
  const linkId = useParams().id

  const getLink = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch (error) { }
  }, [token, linkId, request])

  const removeHandler = async () => {
    try {
      const data = await request(`/api/link/${linkId}/remove`, 'POST', { linkId }, {
        Authorization: `Bearer ${token}`
      })

      enqueueSnackbar(data.message, { variant: 'success' })

      history.push('/links')
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  const editHandler = async (linkToInput) => {
    if (editable && linkToInput !== link.from) {
      try {
        const data = await request(`/api/link/${linkId}/edit`, 'POST', { linkId, linkToInput }, {
          Authorization: `Bearer ${token}`
        })

        enqueueSnackbar(data.message, { variant: 'success' })
        getLink()
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    }
    setEditable(prevState => !prevState)
  }

  useEffect(() => {
    getLink()
  }, [getLink])

  // if (loading) {
  //   return <CircularProgress />
  // }

  return (
    <>
      {!loading && link &&
        <>
          <LinkCard link={link} removeHandler={removeHandler} editHandler={editHandler} editable={editable} />
        </>
      }
    </>
  )
}
