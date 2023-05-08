class Model {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }
  readHeroes() {
    return this.#repository.readHeroes();
  }
  createHero(heroToBeCreated) {
    const name = heroToBeCreated.name;
    const level = heroToBeCreated.level;
    let errorMessages = ``;
    if (this.#wrongHeroName(name)) {
      errorMessages += "The hero name is wrong. It must have a length between 3 and 100.";
    }
    if (this.#wrongHeroLevel(level)) {
      errorMessages += "The hero level should be junior, middle or senior";
    }
    if (this.#alreadyExistsHeroName(name)) {
      errorMessages += "The hero name already exists.";
    }
    if (errorMessages === ``) {
      this.#repository.createHero(heroToBeCreated);
    } else {
      throw new Error(errorMessages);
    }
  }
  deleteHero(nameOfHeroToBeDeleted) {
    if (
      this.#alreadyExistsHeroName(nameOfHeroToBeDeleted) &&
      this.#candelete(nameOfHeroToBeDeleted)
    ) {
      this.#repository.deleteHero(nameOfHeroToBeDeleted);
    }
  }
  #candelete(nameOfHeroToBeDeleted) {
    const heroes = this.#repository.readHeroes();
    for (const hero of heroes) {
      if (hero.name === nameOfHeroToBeDeleted && hero.level === `junior`) {
        return true;
      }
    }
    return false;
  }
  #wrongHeroName(name) {
    return name.length < 3 || name.length > 100;
  }
  #wrongHeroLevel(level) {
    if (level === `junior` || level === `middle` || level === `senior`) {
      return false;
    }
    return true;
  }
  #alreadyExistsHeroName(name) {
    const heroes = this.#repository.readHeroes();
    for (const hero of heroes) {
      if (hero.name === name) {
        return true;
      }
    }
    return false;
  }
  #canupdatelevel(nameOfHeroToBeUpdated, updatelevel) {
    const heroes = this.#repository.readHeroes();
    for (const hero of heroes) {
      if (hero.name === nameOfHeroToBeUpdated) {
        if (hero.level === `junior` && updatelevel === `middle`) {
          return true;
        } else if (hero.level === `middle` && updatelevel === `senior`) {
          return true;
        }
      }
    }
    return false;
  }
  updateHero(nameOfHeroToBeUpdated, updatedHero) {
    let errorMessages = ``;
    if (this.#wrongHeroName(updatedHero.name)) {
      errorMessages += "The hero name is wrong. It must have a length between 3 and 100.";
    }
    if (this.#wrongHeroLevel(updatedHero.level)) {
      errorMessages += "The hero level should be junior, middle or senior";
    }
    if (nameOfHeroToBeUpdated.name != updatedHero.name) {
      if (this.#alreadyExistsHeroName(updatedHero.name)) {
        errorMessages += "The hero name already exists.";
      }
    }
    if (!this.#canupdatelevel(nameOfHeroToBeUpdated.name, updatedHero.level)) {
      errorMessages += "Cannot change the hero level over another step";
    }
    if (errorMessages === ``) {
      this.#repository.updateHero(nameOfHeroToBeUpdated, updatedHero);
    } else {
      throw new Error(errorMessages);
    }
  }
}
