const {Event, EventType, Country, Date} =  require ("../../../db");
const { Op } = require ("sequelize");

const getEventController = async(name, eventType, country, date)=> {
    const whereClause = {};

    if (name) {
        whereClause.name = { [Op.like]:`%${name}%` };
    }
    if (eventType) {
        whereClause.eventType = eventType;
    }
    if (country) {
        whereClause.country = country;
    }
    if (date) {
        whereClause.date = {[Op.eq]:date};
    }

    const events = await Event.findAll({
        where:whereClause,
        include:[
            { model: eventType },
            { model: country },
            { model: date },
        ],
    });
    return events;
    };


module.exports = {getEventController}


// // handler de busqueda por nombre
// const getCountriesHandler = async (req, res) => {
//     const {name} = req.query;
//     try {
//         const countries = name ? await searchByName(name) : await getCountries()
//         res.status(200).json(countries)
//     } catch (error) {
//         res.status(404).send(error.message)
//     }
// };

// // controlador de busqueda por nombre

// const searchByName = async (name) => {
   
//     const countriesName = await Country.findAll({
    
//         where: {name: {[Op.iLike]: `%${name}%`}}
//     })
//     if(countriesName.length) return countriesName;
//         throw Error ('The country was not found');
    
    
// };

// //  (Handler) de recetas by name

// const recipeHandler = async (req, res) => {
//     const { title } = req.query;
//     try {
//         const result = title ? await searchRecipeName(title) : await getAllRecipes();
//         if (result.length === 0) throw Error("This title don't exist");
//         res.status(200).json(result)

//     } catch (error) {
//         return res.status(400).json({ error: error.message });
//     }

// };

// // Función de búsqueda de recetas por nombre (title)
// const searchRecipeName = async (name) => {
//     const dbRecipes = await Recipe.findAll({
//       where: { title: { [Op.iLike]: `%${name}%` } },
//       include: {
//         model: Diet,
//         attributes: ["name"],
//       },
//     });
  
//     const dbInfo = dbRecipes.map((elem) => ({
//       ...cleanRecipeData(elem),
//       createdByDb: true,
//     }));
  
//     const infoApiRecipe = await axios
//       .get(
//         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=100&query=${name}`
//       )
//       .then((response) =>
//         response.data.results.map((ele) => ({
//           ...cleanRecipeData(ele),
//           diets: ele.diets.join(" ,"),
//           created: false,
//         }))
//       );
  
//     const filteredInfo = infoApiRecipe.filter((recipe) =>
//       recipe.title.toLowerCase().includes(name.toLowerCase())
//     );
//     return [...dbInfo, ...filteredInfo];
//   };
