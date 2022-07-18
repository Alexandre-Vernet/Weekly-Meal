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
        const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

        // Get cooking with 7 meals without duplicates and add week days for each element
        return cooking.sort(() => Math.random() - 0.5).slice(0, 7).map((cooking, index) => {
            return {
                ...cooking,
                description: cooking.description,
                title: cooking.title,
                day: weekDays[index]
            };
        });
    }
}
