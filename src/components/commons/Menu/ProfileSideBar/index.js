import AlurakutProfileSidebarMenuDefault from '../Default';

export default function AlurakutMenuProfileSidebar({ githubUser }, { name }) {
  return (
    <div className="alurakutMenuProfileSidebar">
      <div>
        <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
        <hr />
        <p>
          <a className="boxLink" href={`/user/${githubUser}`}>
            {name}
          </a>
        </p>
        <hr />

        <AlurakutProfileSidebarMenuDefault githubUser={githubUser} name={name} />
      </div>
    </div>
  )
}
