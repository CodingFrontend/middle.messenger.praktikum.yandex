import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import * as Layouts from './layouts';

import { render } from '@/core/renderDom';

const pages = {
  login: [Pages.LoginPage],
  register: [Pages.RegisterPage],
  nav: [Pages.NavigationPage],
  chat: [
    Pages.ChatPage,
    {
      chatWidgetItems: [
        { faIcon: 'fa-regular fa-square-plus', text: 'Добавить пользователя' },
        { faIcon: 'fa-regular fa-square-minus', text: 'Удалить пользователя' },
      ],
      chatItems: [
        {
          name: 'Киноклуб',
          date: '12:00',
          message:
            'Друзья, у меня для вас особенный выпуск новостей! В общем говоря,',
          count: 4,
          image: '',
        },
        {
          name: 'Вадим',
          date: '12:00',
          message: 'Круто',
          isMessageUpcoming: true,
          image: '',
        },
      ],
      isChatSelected: true,
      userName: 'Вадим',
      messages: [
        {
          date: '19 июня',
          messages: [
            {
              type: 'incoming',
              content: 'text',
              date: '11:56',
              value:
                'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
            },
            {
              type: 'incoming',
              content: 'text',
              date: '11:56',
              value:
                'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
            },
            {
              type: 'upcoming',
              content: 'text',
              value: 'Круто!',
              date: '12:00',
              read: true,
            },
          ],
        },
      ],
      // showModal: true,
      modalTitle: 'Добавить пользователя',
      modalButtonLabelOk: 'Добавить',
    },
  ],
  profile: [
    Pages.ProfilePage,
    {
      isGeneralInfo: true,
      isEditInfo: false,
      isEditPassword: false,
      email: 'email@yandex.ru',
      login: 'admin',
      first_name: 'Вадим',
      last_name: 'Иванов',
      display_name: 'Вадим',
      phone: '+7 (909) 967 30 30',
      // showModal: true,
      fileUploaded: false,
      emptyError: '',
      fileName: '',
      uploadError: true,
      password: 'admin',
    },
  ],
  serverError: [Pages.ServerErrorPage],
  notFound: [Pages.NotFoundPage],
};

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }

  Handlebars.registerPartial(name, template);
});

Object.entries(Layouts).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }

  Handlebars.registerPartial(name, template);
});

Handlebars.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

function navigate(page: string) {
  const [source, context] = pages[page];
  if (typeof source === 'function') {
    render('#app', new source());
    return;
  }

  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('profile'));

document.addEventListener('click', (e) => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
