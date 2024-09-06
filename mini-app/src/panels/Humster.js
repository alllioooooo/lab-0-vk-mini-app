import { Button, Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import HumsterImg from '../assets/game_logo.jpg';
// import style from './humster.css'

export const Humster = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const handleGoHome = () => {
    routeNavigator.push(DEFAULT_VIEW_PANELS.HOME);
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        ТЕБЕ ЖЕ СКАЗАЛИ ИДИ ТАПАЙ И СТАНЬ МИЛЛИОНЕРОМ!!!!!1!!1!!!!!
      </PanelHeader>
        <h1 style={{ textAlign: 'center' }}>ААААААААА -1 000 000 ХАМСТЕРКОИНОВ  БАЛЛАНСА</h1>
        <img style={{ width: '100%' }} src={HumsterImg} alt="Humster Debil" />
    </Panel>
  );
};

Humster.propTypes = {
  id: PropTypes.string.isRequired,
};
