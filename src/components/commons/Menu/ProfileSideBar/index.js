import Box from '../../../foundation/Box';
import AlurakutProfileSidebarMenuDefault from '../Default';

export default function AlurakutMenuProfileSidebar({ githubUser }, { name }) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          {name}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault githubUser={githubUser} name={name} />
    </Box>
  )
}
