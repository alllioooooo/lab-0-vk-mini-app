import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import Humster from '../assets/game_logo.jpg';

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  const getRandomNumber = async () => {
    try {
      const min = 1;
      const max = 100000;
      const response = await fetch(`https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`);
      
      if (!response.ok) {
        throw new Error('Ошибка при получении случайного числа');
      }
      
      const data = await response.text();
      const result = `+ ${data.trim()} ХАМСТЕРКОИНОВ У МЕНЯ!!!! УРАААААААААААА11111;`
      return result;
    } catch (error) {
      console.error('Ошибка при получении числа:', error);
      return 'Ошибка при генерации числа';
    }
  };

  const stories = async () => {
    const text = await getRandomNumber();
    console.log(text);

    const urlHumster = "https://sun9-47.userapi.com/impg/IazOYJoTOe7Te-2vr7AMCZ7f-WA4svxQKXkYjA/LxIoU4Mr3cM.jpg?size=937x730&quality=95&sign=43a10f25615747616ca3aa5e61495ac9&type=album";

    bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url: urlHumster,
      stickers: [
        {
          sticker_type: 'native',
          sticker: {
            action_type: 'text',
            action: {
              text: text 
            }
          }
        }
      ]
    })
    .then((data) => {
      if (data.code_data) {
        console.log(data);
      }
    })
    .catch((error) => {
      console.log('Ошибка при отображении истории:', error);
    });
  };

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => stories()}>
            ТАПНИ и СТАНЬ МИЛЛИОНЕР!
          </Button>
        </Div>

        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('humster')}>
            НЕ НАЖИМАТЬ!!!!!!!!!!!!!
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};