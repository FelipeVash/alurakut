import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/foundation/Box'
import AlurakutMenu from '../src/components/commons/Menu'
import ProfileSidebar from '../src/components/Profile/ProfileSidebar';
import ProfileRelationsBox from '../src/components/Profile/ProfileRelations/box';

const fixedUser = 'felipevash';

export default function Photobook(props) {
  const baseURL = `https://api.github.com/users/${fixedUser}`;
  const name = props.userData.name;
  const [seguidores, setSeguidores] = React.useState([]);
  const [seguindo, setSeguindo] = React.useState([]);
  const [comunidades, setComunidades] = React.useState([]);
  const [comunidadesDato, setComunidadesDato] = React.useState([]);
  const somaComunidades = [...comunidadesDato, ...comunidades];
  React.useEffect(function() {
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
              Fotos
            </h1>
            <h2 className="subTitle">Algumas imagens para alegrar o perfil</h2>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} numbers={props.userData.followers} />
          <ProfileRelationsBox title="Seguindo" items={seguindo} numbers={props.userData.following} />
          <ProfileRelationsBox title="Comunidades" items={somaComunidades} numbers={somaComunidades.length} />
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