import cooking from "./cooking.json";

export class Cooking {
    static getCookingForWeeks() {
        // Get cooking length
        const cookingLength = Object.keys(cooking).length;

        // Get random number
        const randomNumber = Math.floor(Math.random() * cookingLength);

        // Get cooking with random number
        return cooking[randomNumber].title;
    }
}
