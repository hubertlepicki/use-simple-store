import { Draft } from 'immer';
declare type Listener<T> = (state: T) => void;
declare type Mutator<T> = (state: Draft<T>) => void;
declare type Selector<T, Result> = (state: T) => Result;
export declare class Store<T> {
    private _state;
    private _listeners;
    constructor(initialState: T);
    getState(): Readonly<T>;
    update(mutate: Mutator<T>): void;
    subscribe(listener: Listener<T>): () => undefined;
    useStore<F extends Selector<T, any> = Selector<T, T>>(selector?: F, deps?: any[]): ReturnType<F>;
}
export declare function createStore<T>(initialState: T): Store<T>;
export default createStore;
