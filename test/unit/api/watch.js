import watch from '../../../src/api/watch';

describe('api/watch', function () {
  var parent;
  var child;
  var descendant;

  beforeEach(function () {
    parent = document.createElement('div');
    child = document.createElement('div');
    descendant = document.createElement('div');
  });

  it('should watch for added childNodes', function (done) {
    watch(parent, function (added, removed) {
      expect(added.length).to.equal(1);
      expect(removed.length).to.equal(0);
      done();
    });

    parent.appendChild(child);
  });

  it('should watch for removed childNodes', function (done) {
    parent.appendChild(child);

    watch(parent, function (added, removed) {
      expect(added.length).to.equal(0);
      expect(removed.length).to.equal(1);
      done();
    });

    child.remove();
  });

  it('should only watch immediate childNodes by default', function (done) {
    parent.appendChild(child);
    child.appendChild(descendant);

    watch(parent, function () {
      done('watcher triggered');
    });

    descendant.remove();
    setTimeout(done, 100);
  });

  it('should watch descendants if { subtree: true }', function (done) {
    parent.appendChild(child);
    child.appendChild(descendant);

    watch(parent, function (added, removed) {
      expect(added.length).to.equal(0);
      expect(removed.length).to.equal(1);
      done();
    }, {
      subtree: true
    });

    descendant.remove();
  });
});
