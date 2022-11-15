import type { Game } from '@equal-games/game-scanner'

interface IGameEvents {
  'game-started': CustomEvent<Game>
}

interface StateEventTarget extends EventTarget {
  addEventListener<K extends keyof IGameEvents>(
    type: K,
    listener: (ev: IGameEvents[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean
  ): void
}

const typedEventTarget = EventTarget as {
  new (): StateEventTarget
  prototype: StateEventTarget
}

class GameEvents extends typedEventTarget {
  constructor() {
    super()
  }
}

const gameEvents = new GameEvents()

export default gameEvents
