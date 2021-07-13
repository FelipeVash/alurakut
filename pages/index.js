import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/foundation/Box'
import AlurakutMenu from '../src/components/commons/Menu'
import AlurakutProfileSidebarMenuDefault from '../src/components/commons/Menu/Default'
import OrkutNostalgicIconSet from '../src/components/commons/IconSet';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

const fixedUser = 'felipevash';

function ProfileSidebar(props) {
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
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home(props) {
  const comunidadesGitHub = props.userCommunity;
  const [comunidades, setComunidades] = React.useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }, ...comunidadesGitHub]);
  const lista = props.followers;
  const name = props.userData.name;
  const listaSeguidores = [];

  lista.map((seguidor) => {
    listaSeguidores.push(seguidor.login)
  });
  
  return (
    <>
      <AlurakutMenu githubUser={fixedUser} name={name}/>
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={fixedUser} key={fixedUser} name={name}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), {name}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriarComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores ({listaSeguidores.length})
            </h2>

            <ul>
              {listaSeguidores.map((itemAtual) => {
                if(listaSeguidores.length > 6) {
                  listaSeguidores.splice(6, listaSeguidores.length)
                }
                return (
                  <li  key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                if(comunidades.length > 6) {
                  comunidades.splice(6, comunidades.length)
                }
                return (
                  <li  key={itemAtual.title}>
                    <a href={`/user/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getStaticProps() {
  const followers = await fetch(`https://api.github.com/users/${fixedUser}/followers`)
      .then((resposta) => {
        return resposta.json();
      })
  const userData = await fetch(`https://api.github.com/users/${fixedUser}`)
      .then((resposta) => {
        return resposta.json();
      })
  const userCommunity = await fetch(`https://api.github.com/users/${fixedUser}/starred`)
      .then((resposta) => {
        const respostaConvertida = resposta.json();
        return respostaConvertida
      })
      .then((respostaConvertida) => {
        const comunidadesGitHub = [];
        respostaConvertida.map((community) => {
          let comunidadeGitHub = {
            title: community.name,
            image: community.owner.avatar_url
          }
          comunidadesGitHub.push(comunidadeGitHub);
          return comunidadesGitHub;
        })
        return comunidadesGitHub;
      })

  return {
    props: {
      followers: followers,
      userData: userData,
      userCommunity: userCommunity
    },
  }
}