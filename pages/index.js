import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/foundation/Box'
import AlurakutMenu from '../src/components/commons/Menu'
import OrkutNostalgicIconSet from '../src/components/commons/IconSet';
import ProfileSidebar from '../src/components/Profile/ProfileSidebar';
import ProfileRelationsBox from '../src/components/Profile/ProfileRelations/box';


export default function Home(props) {
  const fixedUser = props.githubUser;
  const baseURL = `https://api.github.com/users/${fixedUser}`;
  const [userData, setUserData] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);
  const [seguindo, setSeguindo] = React.useState([]);
  const [comunidades, setComunidades] = React.useState([]);
  const [comunidadesDato, setComunidadesDato] = React.useState([]);
  const [recados, setRecados] = React.useState([]);
  const somaComunidades = [...comunidadesDato, ...comunidades];

  React.useEffect(function() {
    fetch(`${baseURL}`)
    .then(async function (respostaDoServidor) {
      const respostaCompleta = await respostaDoServidor.json();
      setUserData(respostaCompleta);
    })
    fetch(`${baseURL}/followers`)
    .then(async function (respostaDoServidor) {
      const respostaCompleta = await respostaDoServidor.json();
      setSeguidores(respostaCompleta);
    })
    fetch(`${baseURL}/following`)
    .then(async function (respostaDoServidor) {
      const respostaCompleta = await respostaDoServidor.json();
      setSeguindo(respostaCompleta);
    })

    fetch(`${baseURL}/starred`)
    .then(async function (respostaDoServidor) {
      const respostaCompleta = await respostaDoServidor.json();
      const lists = [];
      respostaCompleta.map((item) => {
        const list = {
          id: item.id,
          url: item.html_url,
          avatar_url: item.owner.avatar_url,
          login: item.name,
        }
        lists.push(list);
      })
      setComunidades(lists);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '290ccfaf5f5e506c5fe4d0770b870b',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }`
      })
    })
    .then((res) => res.json())
    .then(function(resComplete) {
      const lista = resComplete.data.allCommunities;
      const comunidadesDato = [];
      lista.map((comunidade) => {
        const list = {
          id: parseInt(comunidade.id),
          url: '',
          avatar_url: comunidade.imageUrl,
          login: comunidade.title,
        }
        comunidadesDato.push(list);
      })
      setComunidadesDato(comunidadesDato);
    })
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '290ccfaf5f5e506c5fe4d0770b870b',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
          allScraps {
            id
            name
            message
            user
          }
        }`
      })
    })
    .then((res) => res.json())
    .then(function(resComplete) {
      const lista = resComplete.data.allScraps;
      const recadosDato = [];
      lista.map((recado) => {
        const list = {
          id: recado.id,
          name: recado.name,
          message: recado.message,
          user: recado.user,
          creation_date: recado.creation_date
        }
        recadosDato.push(list);
      })
      setRecados(recadosDato);
    })
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={fixedUser} name={userData.name}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={fixedUser} key={fixedUser} name={userData.name}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), {userData.name}
            </h1>

            <OrkutNostalgicIconSet fas={userData.followers} recados={recados.length}/>
          </Box>
          {props.isAuthenticated 
            ? <Box>
                <h2 className="subTitle">O que você deseja fazer?</h2>
                <form onSubmit={function handleCriarComunidade(e) {
                  e.preventDefault();
                  const dadosDoForm = new FormData(e.target);
                  const comunidade = {
                    title: dadosDoForm.get('title'),
                    imageUrl: dadosDoForm.get('image'),
                    creatorSlug: fixedUser,
                    url: dadosDoForm.get('url')
                  }

                  fetch('/api/comunidades', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(comunidade)
                  })
                  .then(async (res) => {
                    const dados = await res.json();
                    const comunidade = dados.registroCriado
                    const comunidadesAtualizadas = [comunidade, ...comunidades];
                    setComunidades(comunidadesAtualizadas);
                  })

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
            : ''
          }
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} numbers={userData.followers} />
          <ProfileRelationsBox title="Seguindo" items={seguindo} numbers={userData.following} />
          <ProfileRelationsBox title="Comunidades" items={somaComunidades} numbers={somaComunidades.length} />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch(`https://alurakut.vercel.app/api/auth`, {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  const { githubUser } = jwt.decode(token);
  const isTrueUser = await fetch(`https://github.com/${githubUser}`)
  .then(async function(resposta) {
    if(resposta.status === 404){
      return false
    } else {
      return true
    }
  })
  if(!isTrueUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  return {
    props: {
      githubUser: githubUser,
      isAuthenticated: isAuthenticated
    },
  }
}