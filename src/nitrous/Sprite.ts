import { Vector2 } from "ts-vector-math"

export default class Sprite {
  static async load(path: string){
    const response = await fetch(path)
    const blob = await response.blob()
    const bitmap = await createImageBitmap(blob)
    return new Sprite(bitmap)
  }

  private constructor(readonly bitmap: ImageBitmap) {
    const {width, height} = bitmap
    this._size = new Vector2([width, height])
  }

  private readonly _size: Vector2

  GetSize(out?: Vector2){
    return this._size.copy(out)
  }
}