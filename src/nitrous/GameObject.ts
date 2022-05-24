import { Vector2 } from 'ts-vector-math';
import Component, { ComponentLike } from './Component.js';
import Sprite from './Sprite.js';

export type ObjectID = bigint & {identifier: 'ID'}

let lastID: bigint  = BigInt(0)

function newID(): ObjectID{
  return lastID++ as ObjectID
}

export interface GameObjectOptions {
  name: string;

  x: number
  y: number
  scale?: number;

  sprite: Sprite

  components?: ComponentLike[];
}

export default class GameObject {
  constructor(public options: GameObjectOptions) {
    this.name = options.name
    const {x, y} = options
    this.position = new Vector2([x, y])
    this.scale = options.scale || 1
    this.sprite = options.sprite

    for(const def of (options.components || [])) {
      const inst = new def(this);
      this.components.set(def, inst);
    }
  }

  Update(){
    
  }

  readonly ID = newID()

  readonly name: string

  position: Vector2

  scale: number

  sprite: Sprite

  components = new Map<ComponentLike, Component>()

  GetComponent<C extends Component>(component: ComponentLike<C>): C{
    const result = this.components.get(component)
    if(result)return result as C
    throw new Error(`Component '${component.name}' does not exist on GameObject '${this.name}'.`)
  }
}