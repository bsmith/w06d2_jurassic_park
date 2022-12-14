const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');

describe('Park', function() {
    let park;
    let dinosaurs;
    
    beforeEach(function () {
        park = new Park("Isla Nublar", 250);
        dinosaurs = [
            new Dinosaur("T Rex", "carnivore", 300),
            new Dinosaur("Mimeosaur", "herbivore", 100),
            new Dinosaur("Herbisaur", "herbivore", 50),
            new Dinosaur("Stegosaur", "omnivore", 150),
            new Dinosaur("Mimeosaur", "herbivore", 90),
        ];
    })
    
    it('should have a name', function () {
        const actual = park.name;
        assert.strictEqual(actual, 'Isla Nublar');
    });
    
    it('should have a ticket price', function () {
        const actual = park.ticketPrice;
        assert.strictEqual(actual, 250);
    });
    
    it('should have a collection of dinosaurs', function () {
        const actual = park.dinosaurs;
        assert.deepStrictEqual(actual, []);
    });

    it('should be able to add a dinosaur to its collection', function () {
        park.addDinosaur(dinosaurs[0]);
        const actual = park.dinosaurs;
        assert.deepStrictEqual(actual, [dinosaurs[0]]);
    });
    
    it('should be able to remove a dinosaur from its collection', function () {
        for (let dinosaur of dinosaurs) {
            park.addDinosaur(dinosaur);
        }
        park.removeDinosaur(dinosaurs[1]);
        const actual = park.dinosaurs;
        assert.deepStrictEqual(actual, [dinosaurs[0], dinosaurs[2], dinosaurs[3], dinosaurs[4]]);
    });
    
    it('should be able to find the dinosaur that attracts the most visitors', function () {
        for (let dinosaur of dinosaurs) {
            park.addDinosaur(dinosaur);
        }
        const actual = park.findMostAttractiveDinosaur();
        assert.strictEqual(actual, dinosaurs[0]);
    });
    
    it('should be able to find all dinosaurs of a particular species', function () {
        for (let dinosaur of dinosaurs) {
            park.addDinosaur(dinosaur);
        }
        const actual = park.findDinosaursBySpecies('Mimeosaur');
        assert.deepStrictEqual(actual, [dinosaurs[1], dinosaurs[4]]);
    });
    
    it('should be able to calculate the total number of visitors per day', function () {
        for (let dinosaur of dinosaurs) {
            park.addDinosaur(dinosaur);
        }
        const actual = park.totalVisitorsPerDay();
        assert.strictEqual(actual, 690);
    });
    
    it('should be able to calculate the total number of visitors per year', function () {
        for (let dinosaur of dinosaurs) {
            park.addDinosaur(dinosaur);
        }
        const actual = park.totalVisitorsPerYear();
        assert.strictEqual(actual, 252022.5)
    });
    
    it('should be able to calculate total revenue for one year', function () {
        for (let dinosaur of dinosaurs) {
            park.addDinosaur(dinosaur);
        }
        const actual = park.totalRevenuePerYear();
        assert.strictEqual(actual, 63005625);
    });

    it('should be able to remove all dinosaurs of a particular species', function () {
        for (let dinosaur of dinosaurs) {
            park.addDinosaur(dinosaur);
        };
        park.removeDinosaursBySpecies('Mimeosaur');
        const actual = park.dinosaurs;
        assert.deepStrictEqual(actual, [dinosaurs[0], dinosaurs[2], dinosaurs[3]]);
    });

    it('should be able to count dinosaurs by diet', function () {
        for (let dinosaur of dinosaurs) {
            park.addDinosaur(dinosaur);
        };
        const actual = park.countDinosaursByDiet();
        assert.deepStrictEqual(actual, {
            carnivore: 1,
            herbivore: 3,
            omnivore: 1
        })
    });
});
