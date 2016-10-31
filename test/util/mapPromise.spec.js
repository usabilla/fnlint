const mapPromise = require('../../lib/util/mapPromise');

describe('mapPromise', () => {

  it('takes a collection, and an async iteratee, and resolves once all iteratee have resolved', function(done) {
    let iteratees = [
      jasmine.createSpy().and.returnValue(Promise.resolve()),
      jasmine.createSpy().and.returnValue(Promise.resolve()),
      jasmine.createSpy().and.returnValue(Promise.resolve())
    ];

    mapPromise([1, 2, 3], (timeout, index) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(iteratees[index](index)), timeout);
      });
    }).then(() => {
      expect(iteratees[0]).toHaveBeenCalledWith(0);
      expect(iteratees[1]).toHaveBeenCalledWith(1);
      expect(iteratees[2]).toHaveBeenCalledWith(2);
      done();
    }).catch(done.fail);
  });

  it('rejects as soon as one promise rejects', function(done) {
    let iteratees = [
      jasmine.createSpy('iteratee 1').and.returnValue(Promise.reject()),
      jasmine.createSpy('iteratee 2').and.returnValue(Promise.resolve()),
      jasmine.createSpy('iteratee 3').and.returnValue(Promise.resolve())
    ];

    mapPromise([1, 2, 3], (timeout, index) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(iteratees[index](index)), timeout);
      });
    }).then(done.fail).catch(() => {
      expect(iteratees[0]).toHaveBeenCalledWith(0);
      expect(iteratees[1]).not.toHaveBeenCalled();
      expect(iteratees[2]).not.toHaveBeenCalled();
      done();
    });
  });

  it('passes item, index, and array to iteratee, and returns iteratee results', function(done) {
    let collection = ['foo', 'bar', 'baz'];
    mapPromise(collection, function(item, index, array) {
      return Promise.resolve({item, index, array});
    }).then((results) => {
      expect(results[0].item).toBe(collection[0]);
      expect(results[0].index).toBe(0);
      expect(results[0].array).toBe(collection);
      expect(results[1].item).toBe(collection[1]);
      expect(results[1].index).toBe(1);
      expect(results[1].array).toBe(collection);
      expect(results[2].item).toBe(collection[2]);
      expect(results[2].index).toBe(2);
      expect(results[2].array).toBe(collection);
      done();
    });
  });

  it('still works asynchronously if iterarees are not', function(done) {
    mapPromise([1, 2, 3], (val) => val * val)
      .then((result) => {
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(4);
        expect(result[2]).toBe(9);
        done();
      })
      .catch(done.fail);
  });

});
