import { Vector2 } from 'ts-vector-math';
import { throwOnUndefined } from './utils';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
export const ctx = throwOnUndefined(
  canvas.getContext('2d')!,
  () => new Error('Could not create CanvasRenderingContext2D')
);

const _position = Vector2.zero
const _zoom = new Vector2([1, 1])
const _resolution = new Vector2([canvas.clientWidth, canvas.clientHeight])

interface Camera {
  Render(): void
  get position(): Vector2
  set position(zoom: Vector2): void
  get zoom(): Vector2
  set zoom(zoom: number | Vector2): void
  get resolution(): Vector2
  WorldToScreenSpace(a: Vector2, out?: Vector2): Vector2
  ScreenToWorldSpace(a: Vector2, out?: Vector2): Vector2
}

const Camera: Camera = {
  get position() { return _position },
  set position(position: Vector2) { position.copy(_position) },
  get zoom() { return _position },
  set zoom(zoom: number | Vector2) {
    const isNumber = typeof zoom == 'number'
    if (isNumber) { _zoom.xy = [zoom, zoom] } else { zoom.copy(_zoom) }
  },
  get resolution(): Vector2
  /**
 * Converts coordi
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
}

export default Camera;

const originalTransform = ctx.getTransform()

function resizeCanvasToDisplaySize(): boolean {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width !== displayWidth || canvas.height !== displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    ctx.setTransform(originalTransform)
    //ctx.translate(Camera.resolution.x / 2, Camera.resolution.y / 2)
    //ctx.translate(Camera.position.x, Camera.position.y)
  }

  return needResize;
}

function Render() {
  resizeCanvasToDisplaySize()

  for (const object of Core.SceneObjects.Deref()) {
    const topLeft = object.sprite.SizeAsVector()
      .scale(object.scale / -2)
      .add(object.position)


  }
}