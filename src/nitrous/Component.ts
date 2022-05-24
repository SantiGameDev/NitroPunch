import Sprite from "./Sprite.js"
import GameObject from "./GameObject.js"
import { Vector2 } from "ts-vector-math"

export type ComponentLike<C extends Component = Component> = {new(object: GameObject): C}

export default abstract class Component{
  protected gameObject: GameObject
  protected position: Vector2
  protected scale: number
  protected sprite: Sprite

  constructor(object: GameObject){
    this.gameObject = object
    const {position, scale, sprite, GetComponent} = object
    this.position = position
    this.scale = scale
    this.sprite = sprite
    this.GetComponent = GetComponent
  }

  

  protected readonly GetComponent: <C extends Component>(component: ComponentLike<C>) => C
}