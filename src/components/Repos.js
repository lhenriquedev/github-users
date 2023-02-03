import React, { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  const { repos } = useContext(GithubContext);

  // faz um loop pelos repositorios e cria propriedades baseado na linguagem
  let getMostlanguagesInRepo = repos.reduce((total, item) => {
    // desestrutura a linguagem. ex: "javascript"
    const { language, stargazers_count } = item;
    // se não tiver linguagem, apenas retorna o objeto
    if (!language) return total;
    // se a linguagem não está no objeto, ele cria um
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      // aqui já existe no objeto, só incrementa + 1
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  // selecionar as 5 linguagem que mais apareceu, usando o metodo sort e slice
  const mostUsedLanguages = Object.values(getMostlanguagesInRepo)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // seleciona as linguagens mais populares baseado no stars
  const mostPopularLanguage = Object.values(getMostlanguagesInRepo)
    .sort((a, b) => b.stars - a.stars)
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // stars, fork
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  const getMostStars = Object.values(stars).slice(-5).reverse();
  const getMostForks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsedLanguages} />
        <Column3D data={getMostStars} />
        <Doughnut2D data={mostPopularLanguage} />
        <Bar3D data={getMostForks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
