import React, { useContext, useEffect, useState } from 'react'
import { TextField, Box, Button } from '@mui/material'
import { useHttp } from '../hooks/http.hook'
import { useSnackbar } from 'notistack'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = e => setForm({ ...form, [e.target.name]: event.target.value })

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      enqueueSnackbar(data.message, { variant: 'success' })
      auth.login(data.token, data.userId)
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  const pressHandler = () => {
    if (event.key === 'Enter') {
      loginHandler()
    }
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      enqueueSnackbar(data.message, { variant: 'success' })
      loginHandler()
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    }
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="on"
    >
      <div className='auth-page'>

        <TextField
          id="outlined-required"
          label="Введите email"
          autoComplete="email"
          name="email"
          value={form.email}
          onChange={changeHandler}
          onKeyPress={pressHandler}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          value={form.password}
          onChange={changeHandler}
          onKeyPress={pressHandler}
        />
        <Button disabled={loading} onClick={loginHandler} variant="contained">Войти</Button>
        <Button disabled={loading} onClick={registerHandler} variant="contained">Регистрация</Button>
      </div>

    </Box>
  )
}
