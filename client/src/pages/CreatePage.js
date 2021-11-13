import * as React from 'react';
import { TextField } from '@mui/material'
import { useHttp } from '../hooks/http.hook';
import { useSnackbar } from 'notistack'
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {
  const history = useHistory()
  const auth = React.useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()
  const { request } = useHttp()
  const [link, setLink] = React.useState('')

  const changeHandler = (event) => setLink(event.target.value)

  const createLink = async () => {
    try {
      const data = await request('/api/link/generate', 'POST', { from: link }, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/detail/${data.link._id}`)
    } catch (error) {
      console.log('error', error.message)
      enqueueSnackbar(error.message, { variant: 'error' })
      if (error.message = 'Нет авторизации') {
        auth.logout()
      }
    }
  }

  const pressHandler = (event) => {
    if (event.key === 'Enter') {
      createLink()
    }
  }

  const blurHandler = (event) => {
    createLink()
  }

  return (
    <div>
      <TextField
        id="outlined-required"
        label="Введите ссылку"
        name="links"
        value={link}
        onChange={changeHandler}
        onKeyPress={pressHandler}
        onBlur={blurHandler}
      />
    </div>
  )
}
