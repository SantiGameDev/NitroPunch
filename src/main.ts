import Camera from "./nucleus/Camera";
import Objects from "./nucleus/Objects";
import Entry from "./scenes/Entry";

function Update(){
  Objects.forEach(object => object.Update())

  Camera.Render()

  requestAnimationFrame(Update);
}

await Entry()

Update();