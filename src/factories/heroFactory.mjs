import HeroRepository from '../repositories/heroRepository.mjs'
import HeroService from '../services/heroService.mjs';

const generateInstance = ({
  filePath
}) => {
  const repository = new HeroRepository({
    file: filePath
  });

  const service = new HeroService({
    heroRepository: repository
  });

  return service;
};

export { generateInstance };