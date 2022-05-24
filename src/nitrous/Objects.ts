import GameObject, { GameObjectOptions, ObjectID } from "./GameObject"
import { GameObjectRef } from "./utils"

const IDMap = new Map<ObjectID, GameObject>()

const Objects = {
  Spawn(options: GameObjectOptions): GameObjectRef{
    const object = new GameObject(options)

    IDMap.set(object.ID, object)

    return new WeakRef(object)
  },

  Destroy(object: GameObject): boolean{
    const {ID, name} = object

    const result = IDMap.delete(ID)
    
    if(!result)console.warn(`GameObject named ${name} with ID ${ID} doesn't exist`)

    return result
  },

  *[Symbol.iterator](){
    for(const object of IDMap.values()){
      yield object
    }
  },

  *entries(){
    for(const object of IDMap.entries()){
      yield object
    }
  },

  forEach(callbackfn: (value: GameObject, key: ObjectID) => void): void{
    for(const [_key, _value] of Objects.entries()){
      callbackfn(_value, _key)
    }
  },

  WeakRef: {
    *[Symbol.iterator](){
      for(const object of Objects){
        yield new WeakRef(object)
      }
    },

    *entries(){
      for(const [_key, _value] of Objects.entries()){
        yield [_key, _value]
      }
    },

    forEach(callbackfn: (value: GameObjectRef, key: ObjectID) => void): void{
      for(const [_key, _value] of Objects.entries()){
        callbackfn(new WeakRef(_value), _key)
      }
    },
  }
}

export default Objects