import React from 'react'
import TextField from '@mui/material/TextField'

export const LinkCard = ({ link, removeHandler, editHandler, editable }) => {
  const [linkToInput, setLinkToInput] = React.useState(link.from)
  const upDate = `${new Date(link.upDate).toLocaleDateString()} ${new Date(link.upDate).toLocaleTimeString()} `

  const linkToOnBlurHandler = () => {
    editHandler(linkToInput)
    editLinkTo()
  }

  React.useEffect(() => {
    setLinkToInput(link.from)
  }, [link.from])

  const editLinkTo = () => {
    return (
      editable
        ? <TextField
          id="outlined-multiline-flexible"
          label="Введите ссылку"
          multiline
          maxRows={4}
          value={linkToInput}
          autoFocus
          onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
          onChange={(event) => setLinkToInput(event.target.value)}
          onBlur={linkToOnBlurHandler}
        />
        : <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
    )
  }

  return (
    <>
      <h2>Ссылка</h2>

      <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      {editLinkTo()}
      <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>
      <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
      {link.upDate ? <p>Изменён: <strong>{upDate}</strong></p> : ''}
      <button onClick={editHandler}>EDIT</button>
      <button onClick={removeHandler}>X</button>
    </>
  )
}
