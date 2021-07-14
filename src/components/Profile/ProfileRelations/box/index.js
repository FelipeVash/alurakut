import React from 'react';
import { ProfileRelationsBoxWrapper } from '../wrapper';

export default function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {props.items.map((itemAtual, i = 0) => {
          if(i < 6){
            i++
            return (
              <li  key={itemAtual.id}>
                <a href={itemAtual.url}>
                  <img src={`${itemAtual.image}`} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          }
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}