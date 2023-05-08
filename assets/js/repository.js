function deepCopyOf(entity) {
  return JSON.parse(JSON.stringify(entity));
}
class Repository {
  #heroes;
  constructor() {
    this.#heroes = [
      {name: `Bob`, level: `senior`},
      {name: `Kevin`, level: `middle`},
      {name: `Dave`, level: `junior`},
    ];
  }
  readHeroes() {
    return deepCopyOf(this.#heroes);
  }
  createHero(heroToBeCreated) {
    this.#heroes.push(heroToBeCreated);
  }
  deleteHero(nameOfHeroToBeDeleted) {
    this.#heroes = this.#heroes.filter((hero) => {
      return hero.name !== nameOfHeroToBeDeleted;
    });
  }
  updateHero(nameOfHeroToBeUpdated, updatedHero) {
    for (const hero of this.#heroes) {
      if (hero.name === nameOfHeroToBeUpdated.name) {
        hero.name = updatedHero.name;
        hero.level = updatedHero.level;
        break;
      }
    }
  }
}
