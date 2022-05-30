export default class HeroService {
  constructor({ heroRepository }) {
    Object.assign(this, { heroRepository });
  }

  find() {
    return this.heroRepository.find();
  }

  create(data) {
    return this.heroRepository.create(data);
  }
};