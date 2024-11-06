import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import * as Layouts from './layouts';

const pages = {
  login: [Pages.LoginPage],
  register: [Pages.RegisterPage],
  nav: [Pages.NavigationPage],
};

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

Object.entries(Layouts).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('register'));

document.addEventListener('click', (e) => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
