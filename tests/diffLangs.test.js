const repos = require('../routes/repos');
const diffLangs = repos.diffLangs;


test('Check if the function does not return an empty array', async () => {
    await expect(diffLangs()).resolves.not.toEqual([]);
    
  });
