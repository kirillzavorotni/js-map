const cities = '“Nashville, TN”, 36.17, -86.78 “New York, NY”, 40.71, -74.00 “Atlanta, GA”, 33.75, -84.39 “Denver, CO”, 39.74, -104.98 “Seattle, WA”, 47.61, -122.33 “Los Angeles, CA”, 34.05, -118.24 “Memphis, TN”, 35.15, -90.05';

function CreateInstanceMap(data) {
  this.data = this.parseData(data);

  this.getClosestCity = (latitude, longitude) => {
    if (this.data.length === 1) {
      return this.data[0][0];
    }

    let closest;
    let city = this.data[0][0];

    this.data.forEach((elem) => {
      const res = this.calculateTheDistance(+elem[2], +elem[3], latitude, longitude);

      if (!closest) {
        closest = res;
      }
      if (res < closest) {
        closest = res;
        city = elem[0];
      }
    });

    return city;
  };

  this.getNorthernmostCity = () => {
    if (this.data.length === 1) {
      return this.data[0][0];
    }

    let northernmostcity = this.data[0][0];
    let latitudeValue = +this.data[0][2];

    this.data.forEach((elem) => {
      if (+elem[2] > latitudeValue) {
        latitudeValue = +elem[2];
        northernmostcity = elem[0];
      }
    });

    return northernmostcity;
  };

  this.getSouthernmostCity = () => {
    if (this.data.length === 1) {
      return this.data[0][0];
    }

    let southernmostCity = this.data[0][0];
    let latitudeValue = +this.data[0][2];

    this.data.forEach((elem) => {
      if (+elem[2] < latitudeValue) {
        latitudeValue = +elem[2];
        southernmostCity = elem[0];
      }
    });
    return southernmostCity;
  };

  this.getEasternmostCity = () => {
    if (this.data.length === 1) {
      return this.data[0][0];
    }

    let easternmostСity = this.data[0][0];
    let longitudeValue = +this.data[0][3];

    this.data.forEach((elem) => {
      if (+elem[3] > longitudeValue) {
        longitudeValue = +elem[3];
        easternmostСity = elem[0];
      }
    });

    return easternmostСity;
  };

  this.getWesternmostCity = () => {
    if (this.data.length === 1) {
      return this.data[0][0];
    }

    let westernmostСity = this.data[0][0];
    let longitudeValue = +this.data[0][3];

    this.data.forEach((elem) => {
      if (+elem[3] < longitudeValue) {
        longitudeValue = +elem[3];
        westernmostСity = elem[0];
      }
    });

    return westernmostСity;
  };

  this.getStateAbbreviation = () => {
    if (this.data.length === 1) {
      return this.data[0][1];
    }

    const store = {};

    this.data.forEach((elem) => {
      store[elem[1]] = '';
    });

    return Object.keys(store).join(' ');
  };
}

CreateInstanceMap.prototype.parseData = (data) => {
  const citiesBlocks = data.replace(/[^\wА-Яа-яЁё\d,-. ]/g, '').split(/\d /);
  const dataParse = [];

  citiesBlocks.forEach((elem) => {
    dataParse.push(elem.split(', '));
  });

  return dataParse;
};

CreateInstanceMap.prototype.calculateTheDistance = (φA, λA, φB, λB) => {
  const earthRadius = 6372795;
  // convert in rad
  const lat1 = φA * Math.PI / 180;
  const lat2 = φB * Math.PI / 180;
  const long1 = λA * Math.PI / 180;
  const long2 = λB * Math.PI / 180;

  // cos, sin
  const cl1 = Math.cos(lat1);
  const cl2 = Math.cos(lat2);
  const sl1 = Math.sin(lat1);
  const sl2 = Math.sin(lat2);
  const delta = long2 - long1;
  const cdelta = Math.cos(delta);
  const sdelta = Math.sin(delta);

  // calculating the length of a large circle
  const y = Math.sqrt(((cl2 * sdelta) ** 2) + ((cl1 * sl2 - sl1 * cl2 * cdelta) ** 2));
  const x = sl1 * sl2 + cl1 * cl2 * cdelta;

  const ad = Math.atan2(y, x);
  const dist = ad * earthRadius;

  return Math.round(dist);
};

const map = new CreateInstanceMap(cities);
