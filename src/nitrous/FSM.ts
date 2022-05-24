import { throwOnUndefined } from "./utils.js"

type StateFunction<S> = (state: S) => void

export default class FSM<S>{
  constructor(initial: S, private readonly evaluateAfterChange = false){
    this.currentState = initial
  }

  private currentState: S

  private states = new Map<S, StateFunction<S>>()

  changeState(newState: S){
    this.currentState = newState

    if(this.evaluateAfterChange)this.evaluate()
  }

  addState(state: S, callback: StateFunction<S>){
    this.states.set(state, callback)
    return this
  }

  evaluate(){
    const state = this.currentState
    throwOnUndefined(
      this.states.get(state),
      `Callback for state '${state}' was not set.`
      )(state)
  }
}