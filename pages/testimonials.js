import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/foundation/Box'
import AlurakutMenu from '../src/components/commons/Menu'
import ProfileSidebar from '../src/components/Profile/ProfileSidebar';
import ProfileRelationsBox from '../src/components/Profile/ProfileRelations/box';

const fixedUser = 'felipevash';

export default function Testimonials(props) {
  const baseURL = `https://api.github.com/users/${fixedUser}`;
  const name = props.userData.name;
  const [seguidores, setSeguidores] = React.useState([]);
  const [seguindo, setSeguindo] = React.useState([]);
  const [comunidades, setComunidades] = React.useState([]);
  const [comunidadesDato, setComunidadesDato] = React.useState([]);
  const [recados, setRecados] = React.useState([]);
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
      <AlurakutMenu githubUser={fixedUser} name={name}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={fixedUser} key={fixedUser} name={name}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Depoimentos
            </h1>
            <h2 className="subTitle">Jura dizer a verdade, nada mais que a verdade?</h2>
            <form onSubmit={function handleCriarRecado(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const recado = {
                name: dadosDoForm.get('name'),
                message: dadosDoForm.get('message'),
                user: dadosDoForm.get('user'),
                creation_date: new Date()
              }

              fetch('/api/scraps', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(recado)
              })
              .then(async (res) => {
                const dados = await res.json();
                const recado = dados.registroCriado
                const recadosAtualizados = [recado, ...recados];
                setRecados(recadosAtualizados);
              })

            }}>
              <div>
                <input 
                  placeholder="Qual seu nome?"
                  name="name"
                  aria-label="Qual seu nome?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Qual sua @?"
                  name="user"
                  aria-label="Qual sua @?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Deixe seu recado!"
                  name="message"
                  aria-label="Deixe seu recado!"
                  type="text"
                />
              </div>
              <button>
                Enviar Depoimento
              </button>
            </form>
          </Box>
          <Box>
            <h2 className="subTitle">Olha quem está depondo contra mim!</h2>
            <ul>
              {recados.map((recado, i = 0) => {
                var avatarUrl = (recado.user === '') ? 'https://lh3.googleusercontent.com/proxy/MY05_OTZxjO_ewYvC_4mmSnp5wgKlRmOcU7wgaS2dZseiMBkGg21-gqRroQ1zsei_xUxxt62qBLfPHy6XBeRytvu3UwsnPaYH76MFJkbFDGN9kmTQhFaGw' : `https://github.com/${recado.user}.png`;
                var userUrl = (recado.user === '') ? '' : `https://github.com/user/${recado.user}`;
                if(i < 3) {
                  return (
                    <li  key={recado.id}>
                      <div className='divScrap'>
                        <a href={userUrl}> 
                          <img src={avatarUrl} />
                        </a>
                        <div className='scrapText'>
                          <h3> {recado.creation_date}{recado.name}: </h3>
                          <p>{recado.message}</p>
                        </div>
                      </div>
                    </li>
                  )
                }
              })}
            </ul>
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