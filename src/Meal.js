export class Meal {

    static getMealForWeek(meal) {
        const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

        // Get meal for 7 days without duplicates and add week days for each element
        return meal.sort(() => Math.random() - 0.5).slice(0, 7).map((meal, index) => {
            return {
                ...meal,
                description: meal.description,
                title: meal.title,
                day: weekDays[index]
            };
        });
    }
}
