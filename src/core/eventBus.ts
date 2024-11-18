export default class EventBus<Event extends string> {
  private listeners: Record<string, Function[]>;
	
  constructor() {
    this.listeners = {};
  }

  on(event: Event, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: Event, callback: Function) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit<T extends any[] = []>(event: Event, ...args: T) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}