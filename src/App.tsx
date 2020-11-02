import appStyles from '@components/app.scss';
import { Component, h } from 'preact';

import { TelegramIcon } from './icons/TelegramIcon';

export default class App extends Component {
  render() {
    return (
      <div className={appStyles.appBox}>
        Application <TelegramIcon width={40} />
      </div>
    );
  }
}
