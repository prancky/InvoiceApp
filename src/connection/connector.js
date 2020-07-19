import * as RESTHelper from './webHelper';

const request = requestToExecute => {
  return requestToExecute
    .then(res => {
      if (res.data.code && res.data.code !== 200 && !res.data.success) {
        handleRequestFailure({response: res});
      } else {
        return res;
      }
    })
    .catch(err => {
      handleRequestFailure(err);
    });
};

const handleRequestFailure = error => {
  const {response} = error;
  if (response && response.status === 401) {
    throw response.status;
  } else if (response && response.data) {
    throw response.data;
  } else {
    throw error.message;
  }
};

export const get = (url, config) => request(RESTHelper.get(url, config));

export const post = (url, body, config) =>
  request(RESTHelper.post(url, body, config));
