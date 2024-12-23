import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { GRID_ITEM_QUANTITY } from '../components/TabContent/ItemsGrid';
import Header from '../components/Header';
import TabContent from '../components/TabContent';
import Chart from '../components/Chart';
import Loader from '../components/Loader';
import { Container } from '../containers';
import {
  useGetCurrentUsersDataQuery,
  useGetTopItemsQuery,
  RequestBody
} from '../store/apiSlices';
import { colors } from '../styles/global';

type Tabs = 'artists' | 'tracks' | 'genres';

const REQUEST_PARAMS: Pick<RequestBody, 'params'> = {
  params: {
    limit: GRID_ITEM_QUANTITY
  }
};

const Navbar = styled.nav`
  // border-bottom: 1px ${colors.green.default} solid;

  ul::after {
    display: block;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      90deg,
      ${colors.green.default} 75%,
      ${colors.green.default + '00'}
    );
    content: '';
  }

  .nav-item {
    cursor: pointer;
    display: inline-block;
    padding: 8px 16px;
    color: ${colors.gray.default};
    border: 1px ${colors.gray.default} solid;
    border-bottom: none;
    border-radius: 8px 8px 0 0;

    &:hover {
      color: ${colors.white};
      background-color: ${colors.gray.default};
      @apply tw-fs-6;
    }

    &--active {
      color: ${colors.white};
      background-color: ${colors.green.default};
      border-color: ${colors.green.default};

      &:hover {
        background-color: ${colors.green.default};
      }
    }
  }
`;

export default function Viewer() {
  const [activeTab, setActiveTab] = useState<Tabs>('artists');

  const userData = useGetCurrentUsersDataQuery();
  const topArtists = useGetTopItemsQuery({
    itemType: 'artists',
    ...REQUEST_PARAMS
  });
  const topSongs = useGetTopItemsQuery({
    itemType: 'tracks',
    ...REQUEST_PARAMS
  });

  const navigate = useNavigate();

  if (!localStorage.getItem('access_token')) navigate('/');

  const isLoading = (...loadingStatuses: boolean[]): boolean => {
    if (!loadingStatuses.length)
      throw new Error('At least one argument must be provided');
    return loadingStatuses.some((i) => i);
  };

  const Content = () => (
    <>
      <h1 className="text--display tw-text-center">
        {userData.data?.display_name}
      </h1>

      <Navbar>
        <ul>
          <li
            className={`nav-item ${
              activeTab === 'artists' ? 'nav-item--active' : ''
            }`}
            onClick={() => activeTab !== 'artists' && setActiveTab('artists')}
          >
            Top artists
          </li>
          <li
            className={`nav-item ${
              activeTab === 'tracks' ? 'nav-item--active' : ''
            }`}
            onClick={() => activeTab !== 'tracks' && setActiveTab('tracks')}
          >
            Top songs
          </li>
          <li
            className={`nav-item ${
              activeTab === 'genres' ? 'nav-item--active' : ''
            }`}
            onClick={() => activeTab !== 'genres' && setActiveTab('genres')}
          >
            Top genres
          </li>
        </ul>
      </Navbar>

      <h2 className="text--display tw-my-8">
        Top&nbsp;
        <span className="text--display tw-capitalize">
          {activeTab === 'tracks' ? 'songs' : activeTab}
        </span>
      </h2>

      {/* Com animação de spring-up (funciona melhor) TODO: Refatorar isso aqui */}
      {activeTab === 'artists' && (
        <TabContent type="artists" data={topArtists.data as TopItems} />
      )}
      {activeTab === 'tracks' && (
        <TabContent type="tracks" data={topSongs.data as TopItems} />
      )}
      {activeTab === 'genres' && (
        <Chart
          topArtists={topArtists.data?.items as Artist[]}
          numberOfGenresToDisplay={5}
        />
      )}

      {/* <TabContent type={activeTab} /> // sem animação de spring-up (as vezes a página inicia em branco) */}
    </>
  );

  return (
    <>
      <Header />
      <Container>
        {isLoading(
          userData.isLoading,
          topArtists.isLoading,
          topSongs.isLoading
        ) ? (
          <Loader scale={1.5} />
        ) : (
          <Content />
        )}
      </Container>
    </>
  );
}
