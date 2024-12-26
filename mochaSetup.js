import { JSDOM } from "jsdom";

const jsdom = new JSDOM(`<body><div id="app"></div></body>`, {
	url: "https://localhost:3000",
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.Node = jsdom.window.Node;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
