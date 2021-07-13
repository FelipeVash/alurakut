import Box from '../../../foundation/Box';
import AlurakutProfileSidebarMenuDefault from '../Default';

export default function AlurakutMenuProfileSidebar({ githubUser }, { name }) {
  const name = props.name;
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          {props.name}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault githubUser={fixedUser} name={name} />
    </Box>
  )
}
