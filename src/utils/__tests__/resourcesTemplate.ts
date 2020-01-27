import {resourcesTemplate} from '../resourcesTemplate';

test('validators: checkBalance', () => {
  expect(resourcesTemplate('Test %value% test', {value: '123'})).toBe('Test 123 test');
  expect(resourcesTemplate('Test %value% test %value2% %value3%', {value: '123', value2: '124', value3: '126'})).toBe(
    'Test 123 test 124 126',
  );
});
