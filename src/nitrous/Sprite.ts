import { Vector2 } from "ts-vector-math"

export default class Sprite {
  static async create(path: string){
    const response = await fetch(path)
    const blob = await response.blob()
    const bitmap = await createImageBitmap(blob)
    return new Sprite(path, bitmap)
  }

  private constructor(readonly path: string, readonly bitmap: ImageBitmap) {
    ({width: this.width, height: this.height} = bitmap)
  }

  readonly width: number
  readonly height: number

  SizeAsVector(){
    return new Vector2([this.width, this.height])
  }
}