import Camera from "./nitrous/Camera";
import Objects from "./nitrous/ObjectIndex";
import Entry from "./nitrous/Entry";

function Update(){
  Objects.forEach(object => object.Update())

  Camera.Render()

  requestAnimationFrame(Update);
}

await Entry()

Update();