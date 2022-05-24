import { Vector2 } from 'ts-vector-math';
import { throwOnUndefined } from './utils';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
export const ctx = throwOnUndefined(
  canvas.getContext('2d')!,
  () => new Error('Could not create CanvasRenderingContext2D')
);

interface Camera{
  position: Vector2
  get resolution(): Vector2
  zoom: number
  Render(): void
  WorldToScreenSpace(a: Vector2, out?: Vector2): Vector2
  ScreenToWorldSpace(a: Vector2, out?: Vector2): Vector2
}

const Camera: Camera = {
  position: Vector2.zero,
  get resolution(){return new Vector2([canvas.clientWidth, canvas.clientHeight])},
  zoom: 1,
  Render,

  WorldToScreenSpace(a: Vector2, out: Vector2 = new Vector2): Vector2{
    //       2a + res
    // out = --------
    //       2 * zoom

    a.scale(2, out)
    out.add(this.resolution)
    out.scale(1 / this.zoom)
    
    return out
  },

  ScreenToWorldSpace(a: Vector2, out: Vector2 = new Vector2): Vector2{
    //                   res
    // out = a * scale - ---
    //                    2

    a.scale(this.zoom, out)
    out.subtract(this.resolution.scale(1/2))

    return out
  },
}

export default Camera;

const originalTransform = ctx.getTransform()

function resizeCanvasToDisplaySize() {
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

  for(const object of Core.SceneObjects.Deref()){
    const topLeft = object.sprite.SizeAsVector()
    .scale(object.scale/-2)
    .add(object.position)

    
  }
}