import axios from 'axios';

export const setOatstalkService = {
  address: 'http://[::1]:5170'
};

class Oatstalk {
  constructor(tubename, serverAddress = setOatstalkService.address) {
    this.tubename = tubename;
    this.serverAddress = serverAddress;
    this.url = `${this.serverAddress}${this.serverAddress.endsWith('/') ? 'tubes/' : '/tubes/'}${this.tubename}`;
    this._errMessage = `[Oatstalk] Error: Server not active or serverAddress is not Oatstalk service. \n Your serverAddress is "${this.serverAddress}"`;
  }

  async put(size = 1) {
    try {
      const res = await axios.get(this.url + `?size=${size}`);
      if (res.status !== 200) throw new Error(this._errMessage);
      return res.data;
    } catch (error) {
      throw new Error(this._errMessage);
    }
  }

  async body(...job) {
    try {
      const res = await axios.post(this.url + '?spreading=1', job);
      if (res.status !== 200) throw new Error(this._errMessage);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error(this._errMessage);
    }
  }
}

export default Oatstalk;
