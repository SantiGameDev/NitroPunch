import Core from "../nucleus/Core";
import Sprite from "../nucleus/Sprite";

const Spawn = Core.SceneObjects.Spawn

export default async function EntryScene(){
  const player_png = await Sprite.create('./player.png')

  Spawn({
    name: 'Player',
    x: 0,
    y: 0,
    sprite: player_png
  })
}