import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/foundation/Box'
import AlurakutMenu from '../src/components/commons/Menu'
import ProfileSidebar from '../src/components/Profile/ProfileSidebar';
import ProfileRelationsBox from '../src/components/Profile/ProfileRelations/box';


export default function githubStarred(props) {
  const fixedUser = props.githubUser;
  const baseURL = `https://api.github.com/users/${fixedUser}`;
  const [userData, setUserData] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);
  const [seguindo, setSeguindo] = React.useState([]);
  const [githubStarred, setGithubStarred] = React.useState([]);
  const [comunidades, setComunidades] = React.useState([]);

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
      setGithubStarred(lists);
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
      setComunidades(comunidadesDato);
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
              Projetos Favoritos no Github
            </h1>
            <h2 className="subTitle">"Nada se cria..."</h2>
            <hr/>
            <ul className="photoBox">
              {githubStarred.map((itemAtual) => {
                return (
                  <li  key={itemAtual.id}>
                    <a href={itemAtual.url}>
                      <img src={itemAtual.avatar_url} />
                      <span>{itemAtual.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <hr/>
            <button>Proxima Pagina</button>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} numbers={userData.followers} />
          <ProfileRelationsBox title="Seguindo" items={seguindo} numbers={userData.following} />
          <ProfileRelationsBox title="Comunidades" items={comunidades} numbers={comunidades.length} />
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
      isAuthenticated: isAuthenticated,
      isTrueUser: isTrueUser
    },
  }
}