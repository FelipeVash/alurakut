import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/foundation/Box'
import AlurakutMenu from '../src/components/commons/Menu'
import OrkutNostalgicIconSet from '../src/components/commons/IconSet';
import ProfileSidebar from '../src/components/Profile/ProfileSidebar';
import ProfileRelationsBox from '../src/components/Profile/ProfileRelations/box';
import { ProfileRelationsBoxWrapper } from '../src/components/Profile/ProfileRelations/wrapper';

const fixedUser = 'felipevash';

export default function Home(props) {
  const name = props.userData.name;
  const comunidadesGitHub = props.userCommunity;
  const [comunidades, setComunidades] = React.useState([{
    id: 1,
    title: 'Eu odeio acordar cedo',
    owner: {fixedUser},
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }, ...comunidadesGitHub]);

  return (
    <>
      <AlurakutMenu githubUser={fixedUser} name={name}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={fixedUser} key={fixedUser} name={name}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), {name}
            </h1>

            <OrkutNostalgicIconSet fas={props.followers.length}/>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriarComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                owner: {fixedUser},
                image: dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas = [comunidade, ...comunidades];
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
          <ProfileRelationsBox title="Seguidores" items={props.followers} />
          <ProfileRelationsBox title="Seguindo" items={props.following} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual, i = 0) => {
                if(i < 6) {
                  i++
                  return (
                    <li  key={itemAtual.id}>
                      <a href={`https://github.com/${itemAtual.owner}/${itemAtual.title}`}>
                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getStaticProps() {
  const baseURL = `https://api.github.com/users/${fixedUser}`;
  const userData = await fetch(`${baseURL}`)
      .then((resposta) => {
        if(resposta.ok) {
          return resposta.json();
        }
        throw new Error('Aconteceu algum problema :(' + resposta.status)
      })
      .catch((error) => {
        console.error(error);
      })
  const followers = await fetch(`${baseURL}/followers`)
    .then((resposta) => {
      if(resposta.ok) {
        return resposta.json();
      }
      throw new Error('Aconteceu algum problema :(' + resposta.status)
    })
    .then((resposta) => {
      const listaSeguidores = [];
      resposta.map((user) => {
        const userList = {
          id: user.id,
          login: user.login,
          image: user.avatar_url,
        }
        listaSeguidores.push(userList);
        return listaSeguidores;
      })
      return listaSeguidores;
    })
  const following = await fetch(`${baseURL}/following`)
    .then((resposta) => {
      if(resposta.ok) {
        return resposta.json();
      }
      throw new Error('Aconteceu algum problema :(' + resposta.status)
    })
    .then((resposta) => {
      const listaSeguindo = [];
      resposta.map((user) => {
        const userList = {
          id: user.id,
          login: user.login,
          image: user.avatar_url,
        }
        listaSeguindo.push(userList);
        return listaSeguindo;
      })
      return listaSeguindo;
      })
  const userCommunity = await fetch(`${baseURL}/starred`)
    .then((resposta) => {
      if(resposta.ok) {
        return resposta.json();
      }
      throw new Error('Aconteceu algum problema :(' + resposta.status)
    })
    .then((resposta) => {
      const comunidadesGitHub = [];
      resposta.map((community) => {
        const comunidadeGitHub = {
          id: community.id,
          title: community.name,
          owner: community.owner.login,
          image: community.owner.avatar_url
        }
        comunidadesGitHub.push(comunidadeGitHub);
        return comunidadesGitHub;
      })
      return comunidadesGitHub;
    })
    .catch((error) => {
      console.error(error);
    })

  return {
    props: {
      userData: userData,
      followers: followers,
      following: following,
      userCommunity: userCommunity
    },
  }
}