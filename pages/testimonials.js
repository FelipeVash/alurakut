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
  const [depoimentos, setDepoimentos] = React.useState([]);

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
      setComunidades(comunidadesDato);
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
          allTestimonials {
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
      const lista = resComplete.data.allTestimonials;
      const depoimentosDato = [];
      lista.map((depoimento) => {
        const list = {
          id: depoimento.id,
          name: depoimento.name,
          message: depoimento.message,
          user: depoimento.user,
        }
        depoimentosDato.push(list);
      })
      setDepoimentos(depoimentosDato);
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
            <form onSubmit={function handleCriarDepoimento(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const depoimento = {
                name: dadosDoForm.get('name'),
                message: dadosDoForm.get('message'),
                user: dadosDoForm.get('user'),
              }

              fetch('/api/testimonials', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(depoimento)
              })
              .then(async (res) => {
                const dados = await res.json();
                const depoimento = dados.registroCriado
                const depoimentosAtualizados = [depoimento, ...depoimentos];
                setDepoimentos(depoimentosAtualizados);
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
              {depoimentos.map((depoimento, i = 0) => {
                var avatarUrl = (depoimento.user === '') ? 'https://lh3.googleusercontent.com/proxy/MY05_OTZxjO_ewYvC_4mmSnp5wgKlRmOcU7wgaS2dZseiMBkGg21-gqRroQ1zsei_xUxxt62qBLfPHy6XBeRytvu3UwsnPaYH76MFJkbFDGN9kmTQhFaGw' : `https://github.com/${depoimento.user}.png`;
                var userUrl = (depoimento.user === '') ? '' : `https://github.com/user/${depoimento.user}`;
                if(i < 3) {
                  return (
                    <li  key={depoimento.id}>
                      <div className='divScrap'>
                        <a href={userUrl}> 
                          <img src={avatarUrl} />
                        </a>
                        <div className='scrapText'>
                          <h3> {depoimento.name}: </h3>
                          <p>{depoimento.message}</p>
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
          <ProfileRelationsBox title="Comunidades" items={comunidades} numbers={comunidades.length} />
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