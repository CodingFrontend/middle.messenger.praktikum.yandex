import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import * as Layouts from './layouts';

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
        },
        {
          name: 'Вадим',
          date: '12:00',
          message: 'Круто',
          isMessgaeUpcoming: true,
        },
      ],
      isChatSelected: true,
      userName: 'Вадим',
      messages: [
        {
          date: '19 июня',
          items: [
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
    },
  ],
};

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

Object.entries(Layouts).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

Handlebars.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('chat'));

document.addEventListener('click', (e) => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
