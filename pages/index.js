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
  React.useEffect(function() {
    fetch(`${baseURL}/followers`)
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })
  }, [])
  React.useEffect(function() {
    fetch(`${baseURL}/following`)
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguindo(respostaCompleta);
    })
  }, [])
  React.useEffect(function() {
    fetch(`${baseURL}/starred`)
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      respostaCompleta.map((resposta) => {
        respostaCompleta.push(resposta.owner.avatar_url)
      })
      setComunidades(respostaCompleta);
    })
  }, [])
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
                url: dadosDoForm.get('url'),
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