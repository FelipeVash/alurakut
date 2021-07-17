import React from 'react';
import { ProfileRelationsBoxWrapper } from '../wrapper';

export default function ProfileRelationsBox({title, items, numbers}) {
  const titleLower = title.toLowerCase();
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({numbers})
      </h2>
      <ul>
        {items.map((itemAtual, i = 0) => {
          if(i < 6){
            i++
            return (
              <li  key={itemAtual.id}>
                <a href={itemAtual.url}>
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            )
          }
        })}
        <a href={`/${titleLower}`}>
          <p>Ver Todos</p>
        </a>
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}