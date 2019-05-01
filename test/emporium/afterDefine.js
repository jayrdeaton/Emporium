const { is, isnt } = require('amprisand'),
  uuid = require('uuid'),
  faker = require('faker'),
  Emporium = require('../../'),
  { MemoryAdapter } = Emporium;
let emporium;

describe('afterDefine', () => {
  describe('setup', () => {
    it('should create a new Emporium', () => {
      const adapter = new MemoryAdapter();
      adapter.is(Object);
      emporium = new Emporium(adapter, {
        afterDefine: (Storable) => { throw { success: true, Storable }}
      });
    });
  });
  describe('emporium.define', () => {
    it( 'should call hook', () => {
      let result;
      try {
        emporium.define('Test_Model', {
          id: {type: String, default: uuid.v1},
          key: String
        });
      } catch(err) {
        result = err;
      };
      is(result);
      is(result.success);
      is(result.Storable);
      is(result.Storable.schema);
    });
  });
});
