import {create} from 'zustand';
import axios, { AxiosRequestConfig,  } from "axios";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};
export const request = ({method, url}, options) =>
  create((set, get) => ({
    ...initialState,

    execute: (parameters = {}) => {
      const {id, data, params, force} = parameters;
      set({...initialState, loading: true});

      if (!force && method === 'GET' && Boolean(get().data)) {
        return;
      }

      axios({
        method,
        url: url + (id || ''),
        data,
        params,
      })
        .then(res => {
          set({...initialState, success: true, data: res.data});
          options?.onSuccess?.(res);
          parameters?.onSuccess?.(res);
        })
        .catch(err => {
          set({...initialState, error: true, errorData: err});
          options?.onError?.(err);
          parameters?.onError?.(err);
        })
        .finally(() => {
          options?.onFinal?.();
          parameters?.onFinal?.();
        });
    },
  }));
