import { immutable, getCommentInfo, getTagsName, getUserById, getAuthorInfo, getReviewerInfo, countReviewers, convertDateType } from './utils.js';

test('convert argument to immutable value', () => {
  const target = { work: 'test' };
  expect(immutable(target)).toEqual({ work: 'test' });
});
