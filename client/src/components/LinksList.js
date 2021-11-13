import { Link } from 'react-router-dom'

export const LinksList = ({ links, removeHandler }) => {

  if (!links.length) {
    return <p className="center">Ссылок пока нет</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Оригинальная</th>
          <th>Кликов</th>
          <th>Сокращенная</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.clicks}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Открыть</Link>
              </td>
              <td>
                <button onClick={() => removeHandler(link._id)}>X</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
