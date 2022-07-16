import {
  action,
  Action,
  createStore,
  createTypedHooks,
  persist,
} from "easy-peasy";
// import { IStoreModel, storeModel } from './models';

interface IStoreModel {
  counter: number;
  addCounter: Action<IStoreModel>;
}

const storeModel: IStoreModel = {
  counter: 0,
  addCounter: action((state) => {
    state.counter += 1;
  }),
};

const options = {
  name: "MyAwesomeStore",
};
export const store = createStore<IStoreModel>(storeModel, options);

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<IStoreModel>();
