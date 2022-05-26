import { Vector2 } from 'ts-vector-math';
import { throwOnUndefined } from './utils';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
export const ctx = throwOnUndefined(
  canvas.getContext('2d')!,
  () => new Error('Could not create CanvasRenderingContext2D')
);

const _position: Vector2 = Vector2.zero
const _zoom: Vector2 = new Vector2([1, 1])
const _resolution: Vector2 = new Vector2([canvas.clientWidth, canvas.clientHeight])

interface Camera {
  get position(): Vector2
  set position(zoom: Vector2)
  get zoom(): Vector2
  set zoom(zoom: Vector2)
  GetResolution(out?: Vector2): Vector2
  WorldToScreenSpace(a: Vector2, out?: Vector2): Vector2
  ScreenToWorldSpace(a: Vector2, out?: Vector2): Vector2
}

const Camera: Camera = {
  get position() { return _position },
  set position(position: Vector2) { position.copy(_position) },
  get zoom() { return _position },
  set zoom(zoom: Vector2) { zoom.copy(_zoom) },
  GetResolution(out?: Vector2): Vector2{ return _resolution.copy(out) },
  WorldToScreenSpace(a: Vector2, out?: Vector2): Vector2{
    return a.copy(out)
  },
  ScreenToWorldSpace(a: Vector2, out?: Vector2): Vector2{
    return a.copy(out)
  }
}

export default Camera;

function resizeCanvasToDisplaySize(): boolean {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width !== displayWidth || canvas.height !== displayHeight;

  if (needResize) {
    // Make the canvas the same size
    _resolution.x = canvas.width = displayWidth;
    _resolution.y = canvas.height = displayHeight;
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