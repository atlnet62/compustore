import {allCategory} from './../controllers/category.js';

describe("affiche les categories", () => {
    test('JSON de categories', async () => {
        const data = await allCategory();
        console.log(data)
        expect(data).toBe(
            
        );
    });

})