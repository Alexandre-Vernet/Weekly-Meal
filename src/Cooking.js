import cooking from "./cooking.json";

export class Cooking {
    static getCookingForOneMeal() {
        // Get cooking length
        const cookingLength = cooking.length;

        // Get random number
        const randomNumber = Math.floor(Math.random() * cookingLength);

        // Get cooking with random number
        return cooking[randomNumber];
    }

    static getCookingForWeek() {
        // Get all cooking
        return cooking;
    }
}
