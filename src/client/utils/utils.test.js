import * as utils from './utils.js';

describe('immutable', () => {
  it('should convert argument to immutable value', () => {
    const target = { work: 'test' };
    expect(utils.immutable(target)).toEqual({ work: 'test' });
  });
});

describe('organizeData', () => {
  it('should return an object with specific types of property', () => {
    const target = [{ name: "React", _id: "5c80f44a2be7fa5d702f4e15" }];
    const result = utils.organizeData(target);
    const expected = {
      "5c80f44a2be7fa5d702f4e15": {
        id: "5c80f44a2be7fa5d702f4e15",
        name: "React"
      }
    };

    expect(result).toEqual(expected);
    expect(result).toEqual(expect.objectContaining({
      "5c80f44a2be7fa5d702f4e15": {
        id: expect.any(String),
        name: expect.any(String)
      }
    }));
  });
});

describe('convertDateType', () => {
  const targetDate = "2019-03-14 08:34:10.305";

  it('should take string argument and return string value', () => {
    expect(utils.convertDateType(targetDate)).toEqual(expect.any(String));
  });

  it('should return undefined, given non-string argument', () => {
    const originalAlert = window.alert;
    window.alert = jest.fn(() => {});

    expect(utils.convertDateType()).toBeUndefined();

    window.alert = originalAlert;
  });
});

describe('countReviewers', () => {
  const reviewers = [{ name: 'ken' }, { name: 'song' }];

  it('take string argument and return string value', () => {
    expect(utils.countReviewers(reviewers)).toEqual(expect.any(String));
  });

  it('should return undefined, given non-array argument', () => {
    const originalAlert = window.alert;
    window.alert = jest.fn(() => {});

    expect(utils.countReviewers()).toBeUndefined();

    window.alert = originalAlert;
  });
});
