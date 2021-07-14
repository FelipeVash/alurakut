import React from 'react';
import AlurakutProfileSidebarMenuDefault from '../../commons/Menu/Default';
import Box from '../../foundation/Box';

export default function ProfileSidebar(props) {
  const name = props.name;
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          {name}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault githubUser={props.githubUser} name={name} />
    </Box>
  )
}
