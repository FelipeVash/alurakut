import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/foundation/Box'
import AlurakutMenu from '../src/components/commons/Menu'
import OrkutNostalgicIconSet from '../src/components/commons/IconSet';
import ProfileSidebar from '../src/components/Profile/ProfileSidebar';
import ProfileRelationsBox from '../src/components/Profile/ProfileRelations/box';

const fixedUser = 'felipevash';

export default function Home(props) {
  const baseURL = `https://api.github.com/users/${fixedUser}`;
  const name = props.userData.name;
  const [seguidores, setSeguidores] = React.useState([]);
  const [seguindo, setSeguindo] = React.useState([]);
  const [comunidades, setComunidades] = React.useState([]);
  React.useEffect(() => {
    fetch(`${baseURL}/followers`)
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
            title: user.login,
            login: user.login,
            image: user.avatar_url,
            url: `https://github.com/${user.login}`,
          }
          listaSeguidores.push(userList);
        })
        setSeguidores(listaSeguidores);
      })
      .catch((error) => {
        console.error(error);
      })
    fetch(`${baseURL}/following`)
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
          title: user.login,
          login: user.login,
          image: user.avatar_url,
          url: `https://github.com/${user.login}`,
        }
        listaSeguindo.push(userList);
      })
      setSeguindo(listaSeguindo);
      })
      .catch((error) => {
        console.error(error);
      })
    fetch(`${baseURL}/starred`)
    .then((resposta) => {
      if(resposta.ok) {
        return resposta.json();
      }
      throw new Error('Aconteceu algum problema :(' + resposta.status)
    })
    .then((resposta) => {
      const comunidadesList = [];
      resposta.map((community) => {
        const comunidadeGitHub = {
          id: community.id,
          title: community.name,
          login: community.owner.login,
          image: community.owner.avatar_url,
          url: `https://github.com/${community.owner.login}/${community.name}`,
        }
        comunidadesList.push(comunidadeGitHub);
      })
      setComunidades(comunidadesList);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])

  // React.useEffect(() => {
  //   fetch(`${baseURL}/following`)
  //   .then((resposta) => {
  //     if(resposta.ok) {
  //       return resposta.json();
  //     }
  //     throw new Error('Aconteceu algum problema :(' + resposta.status)
  //   })
  //   .then((resposta) => {
  //     const listaSeguindo = [];
  //     resposta.map((user) => {
  //       const userList = {
  //         id: user.id,
  //         title: user.login,
  //         login: user.login,
  //         image: user.avatar_url,
  //         url: `https://github.com/${user.login}`,
  //       }
  //       listaSeguindo.push(userList);
  //     })
  //     setSeguindo(listaSeguindo);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  // }, [])
  // React.useEffect(() => {
  //   fetch(`${baseURL}/starred`)
  //   .then((resposta) => {
  //     if(resposta.ok) {
  //       return resposta.json();
  //     }
  //     throw new Error('Aconteceu algum problema :(' + resposta.status)
  //   })
  //   .then((resposta) => {
  //     const comunidadesList = [];
  //     resposta.map((community) => {
  //       const comunidadeGitHub = {
  //         id: community.id,
  //         title: community.name,
  //         login: community.owner.login,
  //         image: community.owner.avatar_url,
  //         url: `https://github.com/${community.owner.login}/${community.name}`,
  //       }
  //       comunidadesList.push(comunidadeGitHub);
  //     })
  //     setComunidades(comunidadesList);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   })
  // }, []);

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

            <OrkutNostalgicIconSet fas={seguidores.length}/>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriarComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                login: {fixedUser},
                image: dadosDoForm.get('image'),
                url: dadosDoForm.get('url')
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
              <div>
                <input 
                  placeholder="Coloque o link para comunidade"
                  name="url"
                  aria-label="Coloque o link para comunidade"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBox title="Seguindo" items={seguindo} />
          <ProfileRelationsBox title="Comunidades" items={comunidades} />
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

  return {
    props: {
      userData: userData,
    },
  }
}